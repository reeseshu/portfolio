"use client";

import React from "react";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export default function MouseTrailCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const context = ctx as CanvasRenderingContext2D;

    let w: number, h: number;
    const targetMouse: { x: number; y: number } = { x: 0, y: 0 };
    const ball = {
      x: 0,
      y: 0,
      size: 0,
      targetSize: 0,
    };

    function resizeReset() {
      // canvas is defined here because we early-returned if it wasn't
      w = (canvas as HTMLCanvasElement).width = window.innerWidth;
      h = (canvas as HTMLCanvasElement).height = window.innerHeight;
      
      // Initialize ball with valid values
      ball.x = w / 2;
      ball.y = h / 2;
      ball.size = 0;
      ball.targetSize = 0;
      targetMouse.x = w / 2;
      targetMouse.y = h / 2;
    }

    function drawBall() {
      // Smooth interpolation for ball position
      ball.x += (targetMouse.x - ball.x) * 0.1;
      ball.y += (targetMouse.y - ball.y) * 0.1;
      ball.size += (ball.targetSize - ball.size) * 0.1;

      // Validate values to prevent non-finite errors
      if (!isFinite(ball.x) || !isFinite(ball.y) || !isFinite(ball.size) || ball.size <= 0) {
        return;
      }

      // Create gradient for fade effect
      const gradient = context.createRadialGradient(
        ball.x, ball.y, 0,
        ball.x, ball.y, ball.size
      );
      
      if (isDark) {
        // Dark theme: light center with smoother fade out (7% more opacity)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.22)");
        gradient.addColorStop(0.05, "rgba(255, 255, 255, 0.20)");
        gradient.addColorStop(0.1, "rgba(255, 255, 255, 0.18)");
        gradient.addColorStop(0.15, "rgba(255, 255, 255, 0.16)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.14)");
        gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.12)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.10)");
        gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.08)");
        gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.06)");
        gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.05)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.04)");
        gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.03)");
        gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.02)");
        gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.01)");
        gradient.addColorStop(0.9, "rgba(255, 255, 255, 0.005)");
        gradient.addColorStop(0.95, "rgba(255, 255, 255, 0.002)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        // Light theme: dark center with smoother fade out (7% more opacity)
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.22)");
        gradient.addColorStop(0.05, "rgba(0, 0, 0, 0.20)");
        gradient.addColorStop(0.1, "rgba(0, 0, 0, 0.18)");
        gradient.addColorStop(0.15, "rgba(0, 0, 0, 0.16)");
        gradient.addColorStop(0.2, "rgba(0, 0, 0, 0.14)");
        gradient.addColorStop(0.25, "rgba(0, 0, 0, 0.12)");
        gradient.addColorStop(0.3, "rgba(0, 0, 0, 0.10)");
        gradient.addColorStop(0.35, "rgba(0, 0, 0, 0.08)");
        gradient.addColorStop(0.4, "rgba(0, 0, 0, 0.06)");
        gradient.addColorStop(0.45, "rgba(0, 0, 0, 0.05)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.04)");
        gradient.addColorStop(0.6, "rgba(0, 0, 0, 0.03)");
        gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.02)");
        gradient.addColorStop(0.8, "rgba(0, 0, 0, 0.01)");
        gradient.addColorStop(0.9, "rgba(0, 0, 0, 0.005)");
        gradient.addColorStop(0.95, "rgba(0, 0, 0, 0.002)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
      context.fill();
    }

    function animationLoop() {
      context.clearRect(0, 0, w, h);
      drawBall();
      requestAnimationFrame(animationLoop);
    }

    function mousemove(e: MouseEvent) {
      // Validate mouse coordinates
      if (isFinite(e.clientX) && isFinite(e.clientY)) {
        targetMouse.x = e.clientX;
        targetMouse.y = e.clientY;
        // Set ball size to full viewport (4x larger)
        const minSize = Math.min(w, h);
        ball.targetSize = minSize;
      }
    }

    function mouseout() {
      // Hide ball when mouse leaves
      ball.targetSize = 0;
    }

    function mouseenter() {
      // Show ball when mouse enters
      if (isFinite(w) && isFinite(h) && w > 0 && h > 0) {
        const minSize = Math.min(w, h);
        ball.targetSize = minSize;
      }
    }


    function init() {
      resizeReset();
      // Start animation loop after a small delay to ensure canvas is ready
      setTimeout(() => {
        animationLoop();
      }, 100);
    }

    // Initialize after canvas is mounted
    const initTimeout = setTimeout(init, 50);
    window.addEventListener("resize", resizeReset);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseout);
    window.addEventListener("mouseenter", mouseenter);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener("resize", resizeReset);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseout", mouseout);
      window.removeEventListener("mouseenter", mouseenter);
    };
  }, [isDark]);

  return (
    <canvas 
      id="canvas" 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  );
}


