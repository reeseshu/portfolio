"use client";

import React from "react";

export default function MouseTrailCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

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

    let w: number, h: number, balls: Ball[] = [];
    const mouse: { x: number | undefined; y: number | undefined } = {
      x: undefined,
      y: undefined,
    };
    const rgb = [
      "rgb(26, 188, 156)",
      "rgb(46, 204, 113)",
      "rgb(52, 152, 219)",
      "rgb(155, 89, 182)",
      "rgb(241, 196, 15)",
      "rgb(230, 126, 34)",
      "rgb(231, 76, 60)",
    ];

    function resizeReset() {
      // canvas is defined here because we early-returned if it wasn't
      w = (canvas as HTMLCanvasElement).width = window.innerWidth;
      h = (canvas as HTMLCanvasElement).height = window.innerHeight;
    }

    function drawBalls() {
      for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
      }
    }

    function animationLoop() {
      context.clearRect(0, 0, w, h);
      context.globalCompositeOperation = "lighter";
      drawBalls();

      const temp: Ball[] = [];
      for (let i = 0; i < balls.length; i++) {
        if (balls[i].time <= balls[i].ttl) {
          temp.push(balls[i]);
        }
      }
      balls = temp;

      requestAnimationFrame(animationLoop);
    }

    function mousemove(e: MouseEvent) {
      mouse.x = e.x;
      mouse.y = e.y;
      for (let i = 0; i < 3; i++) {
        balls.push(new Ball());
      }
    }

    function mouseout() {
      mouse.x = undefined;
      mouse.y = undefined;
    }

    function getRandomInt(min: number, max: number) {
      return Math.round(Math.random() * (max - min)) + min;
    }

    function easeOutQuart(x: number) {
      return 1 - Math.pow(1 - x, 4);
    }

    class Ball {
      start: { x: number; y: number; size: number };
      end: { x: number; y: number };
      x: number;
      y: number;
      size: number;
      style: string;
      time: number;
      ttl: number;

      constructor() {
        this.start = {
          x: (mouse.x ?? 0) + getRandomInt(-20, 20),
          y: (mouse.y ?? 0) + getRandomInt(-20, 20),
          size: getRandomInt(30, 40),
        };
        this.end = {
          x: this.start.x + getRandomInt(-300, 300),
          y: this.start.y + getRandomInt(-300, 300),
        };

        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;

        this.style = rgb[getRandomInt(0, rgb.length - 1)];

        this.time = 0;
        this.ttl = 120;
      }

      draw() {
        // progress 0 -> 1 over life
        const progress = Math.max(0, Math.min(1, 1 - (this.ttl - this.time) / this.ttl));
        // Fade in then out smoothly (0 -> 1 -> 0)
        const alpha = Math.sin(progress * Math.PI);

        const previousAlpha = context.globalAlpha;
        const previousLineWidth = context.lineWidth;
        const previousStrokeStyle = context.strokeStyle;

        context.globalAlpha = alpha;
        context.strokeStyle = this.style;
        // Make ring stroke width proportional to size but clamped
        context.lineWidth = Math.max(1.5, Math.min(4, this.size * 0.12));

        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.stroke();

        context.globalAlpha = previousAlpha;
        context.lineWidth = previousLineWidth;
        context.strokeStyle = previousStrokeStyle as string;
      }

      update() {
        if (this.time <= this.ttl) {
          const progress = 1 - (this.ttl - this.time) / this.ttl;
          this.size = this.start.size * (1 - easeOutQuart(progress));
          this.x = this.x + (this.end.x - this.x) * 0.01;
          this.y = this.y + (this.end.y - this.y) * 0.01;
        }
        this.time++;
      }
    }

    function init() {
      resizeReset();
      animationLoop();
    }

    init();
    window.addEventListener("resize", resizeReset);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseout);

    return () => {
      window.removeEventListener("resize", resizeReset);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseout", mouseout);
    };
  }, []);

  return <canvas id="canvas" ref={canvasRef} />;
}


