import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const StyledCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
`;

const Stars = () => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    const ctx = canvas.getContext('2d');
    let raf;
    let stars = [];
    let shooters = [];
    let w = 0;
    let h = 0;
    let lastT = 0;
    // eased pointer position (absolute) — starts centered
    const mouse = { tx: 0, ty: 0, x: 0, y: 0, active: false };

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouse.tx = mouse.x = w / 2;
      mouse.ty = mouse.y = h / 2;
      const count = Math.min(220, Math.floor((w * h) / 8000));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: depth * 0.9 + 0.3,
          baseAlpha: depth * 0.5 + 0.15,
          vy: depth * 0.014 + 0.004,
          speed: Math.random() * 0.0012 + 0.0004,
          phase: Math.random() * Math.PI * 2,
          depth,
          green: Math.random() < 0.1,
        };
      });
    };

    const spawnShooter = () => {
      const dir = Math.random() < 0.5 ? 1 : -1;
      const speed = Math.random() * 0.25 + 0.32; // px/ms
      const vx = dir * speed * 0.92;
      const vy = speed * 0.55;
      shooters.push({
        x: dir === 1 ? Math.random() * w * 0.6 : w * 0.4 + Math.random() * w * 0.6,
        y: Math.random() * h * 0.35,
        vx,
        vy,
        len: Math.random() * 70 + 90,
        green: Math.random() < 0.35,
      });
    };

    const drawGlow = () => {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 320);
      g.addColorStop(0, 'rgba(100, 255, 218, 0.08)');
      g.addColorStop(0.5, 'rgba(100, 255, 218, 0.03)');
      g.addColorStop(1, 'rgba(100, 255, 218, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawShooters = dt => {
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const mag = Math.hypot(s.vx, s.vy);
        const tailX = s.x - (s.vx / mag) * s.len;
        const tailY = s.y - (s.vy / mag) * s.len;
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        const head = s.green ? '100, 255, 218' : '203, 214, 246';
        grad.addColorStop(0, `rgba(${head}, 0.9)`);
        grad.addColorStop(1, `rgba(${head}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        if (s.x < -s.len || s.x > w + s.len || s.y > h + s.len) {
          shooters.splice(i, 1);
        }
      }
    };

    const render = t => {
      const dt = lastT ? Math.min(t - lastT, 50) : 16;
      lastT = t;

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      const ox = ((mouse.x - w / 2) / (w / 2)) * 20;
      const oy = ((mouse.y - h / 2) / (h / 2)) * 20;

      ctx.clearRect(0, 0, w, h);
      drawGlow();

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.vy * dt;
        if (s.y < -2) {
          s.y = h + 2;
          s.x = Math.random() * w;
        }
        const px = ox * (s.depth * 1.6 + 0.2);
        const py = oy * (s.depth * 1.6 + 0.2);
        const twinkle = Math.sin(s.phase + t * s.speed) * 0.3;
        const alpha = Math.max(0, Math.min(1, s.baseAlpha + twinkle));
        ctx.beginPath();
        ctx.arc(s.x + px, s.y + py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.green
          ? `rgba(100, 255, 218, ${alpha})`
          : `rgba(203, 214, 246, ${alpha})`;
        ctx.fill();
      }

      // occasionally launch a shooting star (cap concurrent)
      if (shooters.length < 2 && Math.random() < 0.009 * (dt / 16)) {
        spawnShooter();
      }
      drawShooters(dt);

      raf = window.requestAnimationFrame(render);
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.green
          ? `rgba(100, 255, 218, ${s.baseAlpha})`
          : `rgba(203, 214, 246, ${s.baseAlpha})`;
        ctx.fill();
      }
    };

    const onMouse = e => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const onResize = () => {
      window.cancelAnimationFrame(raf);
      lastT = 0;
      init();
      if (prefersReducedMotion) {
        renderStatic();
      } else {
        raf = window.requestAnimationFrame(render);
      }
    };

    init();
    if (prefersReducedMotion) {
      renderStatic();
    } else {
      raf = window.requestAnimationFrame(render);
      window.addEventListener('mousemove', onMouse);
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [prefersReducedMotion]);

  return <StyledCanvas ref={canvasRef} aria-hidden="true" />;
};

export default Stars;
