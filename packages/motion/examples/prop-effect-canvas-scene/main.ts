// A day cycle drawn on a canvas: propEffect writes motion values into a plain object the draw loop reads
import { animate, cancelFrame, frame, mapValue, motionValue, propEffect, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const STARS = Array.from({ length: 30 }, (_, i) => ({ x: ((i * 71) % 100) / 100, y: ((i * 37) % 60) / 100 }));

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<canvas class="${preview ? '' : 'big'}"></canvas>`;
  const canvas = el.querySelector('canvas')!;
  const ctx = canvas.getContext('2d')!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = preview ? 240 : 400;
  const Hh = preview ? 150 : 250;
  canvas.width = W * dpr;
  canvas.height = Hh * dpr;

  // The "scene" is a plain object. Nothing in it knows about Motion.
  const scene = { time: 0, sky: '#101830', stars: 1, hills: '#0c1420' };
  const time = motionValue(0.5); // 0 = midnight, 0.5 = noon
  const stars = mapValue(time, [0, 0.2, 0.3, 0.7, 0.8, 1], [1, 1, 0, 0, 1, 1]);
  const sky = mapValue(time, [0, 0.22, 0.3, 0.5, 0.7, 0.78, 1], ['#0a1030', '#0a1030', '#ff9a5a', '#5cb8ff', '#ff8a5a', '#0a1030', '#0a1030']);
  const hills = mapValue(time, [0, 0.25, 0.5, 0.75, 1], ['#0c1420', '#3a2a3a', '#2f7a48', '#3a2a3a', '#0c1420']);
  let cancelEffect: VoidFunction = () => {};
  let p: ReturnType<typeof panel> | undefined;

  const draw = (): void => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = scene.sky;
    ctx.fillRect(0, 0, W, Hh);
    ctx.fillStyle = `rgba(255,255,255,${scene.stars})`;
    for (const s of STARS) ctx.fillRect(s.x * W, s.y * Hh, 1.5, 1.5);
    const horizon = Hh * 0.72;
    const a = (scene.time - 0.25) * Math.PI * 2;
    const orbit = (angle: number, colour: string, r: number): void => {
      const x = W / 2 + Math.cos(angle) * W * 0.4;
      const y = horizon - Math.sin(angle) * Hh * 0.6;
      ctx.fillStyle = colour;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };
    orbit(a, '#ffe27a', 13);
    orbit(a + Math.PI, '#e8ecff', 9);
    ctx.fillStyle = scene.hills;
    ctx.beginPath();
    ctx.moveTo(0, Hh);
    for (let x = 0; x <= W; x += 8) ctx.lineTo(x, horizon + Math.sin(x / 34) * 6 + 6);
    ctx.lineTo(W, Hh);
    ctx.fill();
  };

  const scope = scopeMotion(el, () => {
    // Each key in the object receives its motion value on every frame the value changes.
    cancelEffect = propEffect(scene, { time, sky, stars, hills });
    frame.update(draw, true); // redraw every frame, on Motion's own loop
    if (preview) {
      animate(time, [0, 1], { duration: 12, ease: 'linear', repeat: Infinity });
    } else {
      hint(el, 'Scrub the time of day or let it run. The canvas code only reads scene.sky, scene.stars and scene.time.');
      p = panel(el);
      const slider = p.slider('time of day', { min: 0, max: 100, step: 1, value: 50 }, (v) => { run?.stop(); time.set(v / 100); });
      let run: ReturnType<typeof animate> | undefined;
      p.button('Play a day', () => {
        run?.stop();
        slider.value = '0';
        run = animate(time, [0, 1], { duration: 10, ease: 'linear' });
      });
    }
  });
  return () => { scope.cancel(); cancelEffect(); cancelFrame(draw); p?.dispose(); };
};

export default mount;
