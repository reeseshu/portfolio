import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data');
const dataFile = path.join(dataDir, 'content.json');

interface WorkProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured: boolean;
}

interface ExperienceJob {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

interface ContentData {
  about: string;
  experience: string;
  work: string;
  contact: string;
  skills: string[];
  heroGreeting: string;
  heroName: string;
  heroSubtitle: string;
  heroDescription: string;
  workProjects: WorkProject[];
  experienceJobs: ExperienceJob[];
}

async function ensureDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch {}
}

export async function GET() {
  try {
    await ensureDir();
    const content = await fs.readFile(dataFile, 'utf8').catch(async () => {
      const initial = JSON.stringify({
        about: '',
        experience: '',
        work: '',
        contact: '',
        skills: [],
        heroGreeting: '',
        heroName: '',
        heroSubtitle: '',
        heroDescription: '',
        workProjects: [],
        experienceJobs: [],
      }, null, 2);
      await fs.writeFile(dataFile, initial, 'utf8');
      return initial;
    });
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }
    const {
      about = '',
      experience = '',
      work = '',
      contact = '',
      skills = [],
      heroGreeting = '',
      heroName = '',
      heroSubtitle = '',
      heroDescription = '',
      workProjects = [],
      experienceJobs = [],
    } = body as ContentData;
    const data = {
      about,
      experience,
      work,
      contact,
      skills,
      heroGreeting,
      heroName,
      heroSubtitle,
      heroDescription,
      workProjects,
      experienceJobs,
    };
    await ensureDir();
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}


