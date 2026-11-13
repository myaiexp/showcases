// gsap.ticker listeners: a frame-rate-independent ball with deltaRatio, a per-tick ball, and a once() ping
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const lane = document.createElement('div');
  lane.className = 'lane';
  const mk = (cls: string): HTMLElement => {
    const d = document.createElement('div');
    d.className = `ball ${cls}`;
    lane.append(d);
    return d;
  };
  const fixed = mk('fixed');
  const ratio = mk('ratio');
  const readout = document.createElement('p');
  readout.className = 'readout';
  el.append(lane, readout);

  const W = preview ? 200 : 360;
  lane.style.width = `${W}px`;
  const MAX = W - 24;

  let xFixed = 0;
  let xRatio = 0;
  const setFixed = gsap.quickSetter(fixed, 'x', 'px');
  const setRatio = gsap.quickSetter(ratio, 'x', 'px');
  const fmt = (n: number): string => n.toFixed(2);

  // Runs after the core engine updates on every requestAnimationFrame tick.
  const onTick = (time: number, deltaTime: number, frame: number): void => {
    xFixed = (xFixed + 3) % MAX; // same step every tick: faster on a 120Hz screen
    xRatio = (xRatio + 3 * gsap.ticker.deltaRatio(60)) % MAX; // scaled to elapsed time: same speed everywhere
    setFixed(xFixed);
    setRatio(xRatio);
    if (!preview && frame % 6 === 0) {
      readout.textContent = `time ${fmt(time)}s | frame ${frame} | deltaTime ${fmt(deltaTime)}ms | deltaRatio(60) ${fmt(gsap.ticker.deltaRatio(60))}`;
    }
  };
  gsap.ticker.add(onTick);

  let ping: HTMLButtonElement | undefined;
  let flashTimer = 0;
  const flash = (): void => {
    lane.classList.add('flash');
    window.clearTimeout(flashTimer);
    flashTimer = window.setTimeout(() => lane.classList.remove('flash'), 150);
  };
  const onPing = (): void => {
    // once = true: the listener removes itself after the next tick
    gsap.ticker.add(flash, true);
  };
  if (!preview) {
    ping = document.createElement('button');
    ping.className = 'btn';
    ping.textContent = 'ticker.add(fn, true) (once)';
    ping.addEventListener('click', onPing);
    const key = document.createElement('p');
    key.className = 'readout';
    key.textContent = 'Orange moves 3px every tick. Blue moves 3px per 1/60s using deltaRatio(60). They only differ when the display is not 60Hz.';
    el.append(ping, key);
  }

  return () => {
    gsap.ticker.remove(onTick);
    gsap.ticker.remove(flash);
    window.clearTimeout(flashTimer);
    ping?.removeEventListener('click', onPing);
    lane.classList.remove('flash');
  };
};

export default mount;
