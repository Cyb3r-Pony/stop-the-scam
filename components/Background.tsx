import React, { useEffect, useRef } from 'react';

/**
 * Threat Flow Grid
 *
 * Scoped signal-flow animation for the dark operational zone only.
 * It sits behind the live threat-data panels, where a moving feed is
 * meaningful — not behind the whole site, where it was decoration.
 *
 * Renders transparently over its parent (which must be `relative`).
 */
const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsLimit = 24;
    const frameInterval = 1000 / fpsLimit;

    const lineSpacing = 88;
    const flowLines: FlowLine[] = [];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    class Pulse {
      x: number;
      length: number;
      speed: number;
      opacity: number;
      color: string;

      constructor(w: number) {
        this.x = Math.random() * w;
        this.length = 120 + Math.random() * 220;
        this.speed = 0.7 + Math.random() * 0.7;
        this.opacity = 0.12 + Math.random() * 0.22;
        // Mostly slate signal, occasionally a cyan detection event
        this.color = Math.random() > 0.85 ? '34, 211, 238' : '71, 85, 105';
      }

      update(w: number) {
        this.x += this.speed;
        if (this.x > w) this.x = -this.length;
      }

      draw(c: CanvasRenderingContext2D, y: number) {
        const gradient = c.createLinearGradient(this.x, 0, this.x + this.length, 0);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        c.fillStyle = gradient;
        c.fillRect(this.x, y - 0.5, this.length, 1);
      }
    }

    class FlowLine {
      y: number;
      pulses: Pulse[];

      constructor(y: number, w: number) {
        this.y = y;
        this.pulses = Array.from({ length: 1 + Math.floor(Math.random() * 2) }, () => new Pulse(w));
      }

      draw(c: CanvasRenderingContext2D, w: number) {
        c.beginPath();
        c.moveTo(0, this.y);
        c.lineTo(w, this.y);
        c.strokeStyle = 'rgba(148, 163, 184, 0.05)';
        c.lineWidth = 1;
        c.stroke();

        if (!prefersReducedMotion) {
          this.pulses.forEach(p => {
            p.update(w);
            p.draw(c, this.y);
          });
        }
      }
    }

    const init = () => {
      flowLines.length = 0;
      for (let y = lineSpacing / 2; y < canvas.height; y += lineSpacing) {
        flowLines.push(new FlowLine(y, canvas.width));
      }
    };

    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      init();
    };

    const animate = (time: number) => {
      if (time - lastTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      flowLines.forEach(line => line.draw(ctx, w));

      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" aria-hidden="true" />;
};

export default Background;
