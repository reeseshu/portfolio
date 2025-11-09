// src/app/api/wave/route.ts
export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/** ---------- Helpers ---------- **/
function isEmail(x: unknown): x is string {
  return typeof x === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

// Simple in-memory rate-limit (ok for local/dev; resets on server restart)
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;  // 1 minute window
const MAX_HITS = 5;        // max 5 POSTs/min per IP
function tooMany(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_HITS;
}

/** ---------- Handler ---------- **/
export async function POST(req: Request) {
  try {
    // 1) Same-origin allowlist (protects from other sites posting to your API)
    const origin = req.headers.get('origin') || '';
    const allowed = /^https?:\/\/(localhost:\d+|127\.0\.0\.1:\d+|yourdomain\.com)$/.test(origin);
    if (!allowed) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 2) Content type check (only accept JSON)
    const ctype = req.headers.get('content-type') || '';
    if (!ctype.includes('application/json')) {
      return NextResponse.json({ error: 'Bad content type' }, { status: 415 });
    }

    // 3) Parse and validate inputs
    const body = await req.json();
    const email = body?.email;
    const token = body?.token; // Turnstile token from the client

    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // 4) Rate limit
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      // In local dev there may not be an IP header:
      'local';
    if (tooMany(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 5) Bot check: verify Turnstile token with Cloudflare
    if (!process.env.TURNSTILE_SECRET) {
      console.warn('TURNSTILE_SECRET missing; skipping bot verification (dev only)');
    } else {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET,
          response: token || '',
          remoteip: ip,
        }),
      }).then(r => r.json());

      if (!verifyRes?.success) {
        return NextResponse.json({ error: 'Bot check failed' }, { status: 400 });
      }
    }

    // 6) Email credentials present?
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({ error: 'Email not configured' }, { status: 500 });
    }

    // 7) Create transporter (correct function) and send
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`, // fixed sender (prevents header injection)
      to: process.env.EMAIL_USER,
      subject: '👋 New wave',
      replyTo: email, // safe: nodemailer normalizes
      text: `From: ${email}\n\nSomeone sent you a wave! 👋`,
      html: `<p><b>From:</b> ${email}</p><p>Someone sent you a wave! 👋</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Wave error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
