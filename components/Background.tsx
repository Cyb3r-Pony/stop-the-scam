import React, { useEffect, useRef } from 'react';

/**
 * Threat Flow Grid Background
 * 
 * Visualization of data flow and threat monitoring.
 * Optimized for institutional authority and performance.
 */
const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsLimit = 30;
    const frameInterval = 1000 / fpsLimit;

    // Configuration
    const lineSpacing = 70;
    const basePulseSpeed = 1.8;
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
        this.length = 150 + Math.random() * 200;
        this.speed = basePulseSpeed + Math.random() * 1.2;
        this.opacity = 0.2 + Math.random() * 0.4;
        this.color = Math.random() > 0.8 ? '59, 130, 246' : '37, 99, 235'; // Blue-500 or Blue-600
      }

      update(w: number) {
        this.x += this.speed;
        if (this.x > w) {
          this.x = -this.length;
        }
      }

      draw(ctx: CanvasRenderingContext2D, y: number) {
        const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.length, 0);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, y - 1, this.length, 2);
        
        // Add a "core" white spark for more technical feel
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
          ctx.fillRect(this.x + this.length/2, y - 1, 2, 2);
        }
      }
    }

    class FlowLine {
      y: number;
      opacity: number;
      pulses: Pulse[];

      constructor(y: number, w: number) {
        this.y = y;
        this.opacity = 0.05 + Math.random() * 0.08;
        // Increased pulses per line for visibility
        this.pulses = Array.from({ length: 2 + Math.floor(Math.random() * 2) }, () => new Pulse(w));
      }

      draw(ctx: CanvasRenderingContext2D, w: number) {
        // Base institutional line
        ctx.beginPath();
        ctx.moveTo(0, this.y);
        ctx.lineTo(w, this.y);
        ctx.strokeStyle = `rgba(30, 58, 138, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Data pulses
        if (!prefersReducedMotion) {
          this.pulses.forEach(p => {
            p.update(w);
            p.draw(ctx, this.y);
          });
        }
      }
    }

    const init = () => {
      flowLines.length = 0;
      const w = canvas.width;
      const h = canvas.height;
      
      for (let y = lineSpacing / 2; y < h; y += lineSpacing) {
        flowLines.push(new FlowLine(y, w));
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const drawGridDecorations = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      // Very faint vertical grid markers
      ctx.beginPath();
      for (let x = 0; x < w; x += lineSpacing * 4) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.02)';
      ctx.lineWidth = 1;
      ctx.stroke();
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
      
      // Base Solid Layer
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // Radial Glow for depth
      const radialGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
      radialGrad.addColorStop(0, '#0f172a');
      radialGrad.addColorStop(1, '#020617');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, w, h);

      drawGridDecorations(ctx, w, h);

      flowLines.forEach(line => {
        line.draw(ctx, w);
      });

      // Scanline overlay effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
      for (let i = 0; i < h; i += 4) {
        ctx.fillRect(0, i, w, 1);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ backgroundColor: '#020617' }}
    />
  );
};

export default Background;