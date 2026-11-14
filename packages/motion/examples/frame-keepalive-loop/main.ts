// A solar system on a custom frame loop: frame.update(fn, true) keeps firing until cancelFrame stops it
import { cancelFrame, frame, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

// radius (px), seconds per orbit, size, colour
const PLANETS = [
  { r: 34, period: 3, size: 9, color: '#c8c8d0' },
  { r: 56, period: 6, size: 13, color: '#f0a050' },
  { r: 80, period: 10, size: 15, color: '#5aa0ff' },
] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="system${preview ? '' : ' full'}">
      <div class="sun"></div>
      ${PLANETS.map((p) => `<div class="ring" style="width:${p.r * 2}px;height:${p.r * 2}px"></div><div class="planet" style="width:${p.size}px;height:${p.size}px;background:${p.color}"></div>`).join('')}
    </div>
    <div class="frames"></div>`;
  const planets = [...el.querySelectorAll<HTMLElement>('.planet')];
  const readout = el.querySelector<HTMLElement>('.frames')!;
  let frames = 0;
  let speed = 1;
  let running = false;
  let limit = Infinity;
  let p: ReturnType<typeof panel> | undefined;
  let status: ((v: string | number) => void) | undefined;
  let last = 0;

  // The loop body. Motion calls it once per frame because it was scheduled with `true`.
  const step = (_: unknown): void => {
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    frames++;
    angle.forEach((a, i) => {
      angle[i] = a + (dt / PLANETS[i]!.period) * Math.PI * 2 * speed;
      planets[i]!.style.transform = `translate(${Math.cos(angle[i]!) * PLANETS[i]!.r}px, ${Math.sin(angle[i]!) * PLANETS[i]!.r}px)`;
    });
    readout.textContent = `frames ${frames}`;
    // Stop after N frames: cancelFrame takes the same function that was scheduled.
    if (frames >= limit) stop();
  };
  const angle = PLANETS.map((_, i) => i * 2);

  const start = (): void => {
    if (running) return;
    running = true;
    frames = 0;
    last = performance.now();
    frame.update(step, true);
    status?.('running');
  };
  const stop = (): void => {
    cancelFrame(step);
    running = false;
    status?.('stopped');
  };

  const scope = scopeMotion(el, () => {
    if (preview) {
      start();
      // frame callbacks are not collected by the scope, so the cleanup below cancels the loop.
    } else {
      hint(el, 'The orbits run in a function Motion calls every frame (frame.update with true). Stop it by hand, or set it to stop itself after N frames.');
      p = panel(el);
      status = p.readout('loop', 'stopped');
      p.button('Start', () => { limit = Infinity; start(); });
      p.button('Stop', stop);
      p.button('Run 120 frames', () => { stop(); limit = 120; start(); });
      p.button('Run forever', () => { stop(); limit = Infinity; start(); });
      p.slider('speed', { min: 0.2, max: 4, step: 0.1, value: 1 }, (v) => { speed = v; });
      limit = Infinity;
      start();
    }
  });

  return () => {
    scope.cancel();
    cancelFrame(step);
    p?.dispose();
  };
};

export default mount;
