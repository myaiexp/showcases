// ScrambleText delay: the same scramble started after 0, 500 or 1500 ms, with an elapsed-time readout
import { animate, scrambleText } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const DELAYS = [0, 500, 1500];

const mount: Mount = (el, { preview }) => {
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Add a delay in milliseconds before the scramble animation starts.';
  el.append(p);

  const readout = document.createElement('div');
  readout.className = 'label';
  let anim: ReturnType<typeof animate> | null = null;
  let raf = 0;

  const play = (delay: number): void => {
    cancelAnimationFrame(raf);
    anim?.revert();
    anim = animate(p, { innerHTML: scrambleText({ delay }) });
    const t0 = performance.now();
    const tick = (): void => {
      const t = performance.now() - t0;
      readout.textContent = `delay: ${delay}ms | elapsed: ${Math.round(t)}ms | ${t < delay ? 'waiting' : 'scrambling'}`;
      if (t < delay + 2500) raf = requestAnimationFrame(tick);
    };
    tick();
  };

  let timer = 0;
  const buttons: Array<[HTMLButtonElement, () => void]> = [];
  if (preview) {
    let i = 0;
    const cycle = (): void => play(DELAYS[i++ % DELAYS.length] ?? 0);
    cycle();
    timer = window.setInterval(cycle, 3500);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    DELAYS.forEach((d) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = String(d);
      const fn = (): void => play(d);
      b.addEventListener('click', fn);
      buttons.push([b, fn]);
      panel.append(b);
    });
    el.append(panel, readout);
    readout.textContent = 'Press a delay.';
  }

  return () => {
    window.clearInterval(timer);
    cancelAnimationFrame(raf);
    buttons.forEach(([b, fn]) => b.removeEventListener('click', fn));
    anim?.revert();
  };
};

export default mount;
