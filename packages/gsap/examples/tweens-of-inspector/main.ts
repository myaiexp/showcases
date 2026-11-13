// Boxes carry several tweens while a live panel reads getTweensOf(), isTweening() and what killTweensOf() removes
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const mkBox = (cls: string, label: string): HTMLElement => {
    const track = document.createElement('div');
    track.className = 'track';
    const box = document.createElement('div');
    box.className = `box ${cls}`;
    box.textContent = label;
    track.append(box);
    root.append(track);
    return box;
  };
  const a = mkBox('a', 'A');
  const b = mkBox('b', 'B');
  const panel = document.createElement('pre');
  panel.className = 'panel';
  const log = document.createElement('div');
  log.className = 'log';
  root.append(panel, log);
  el.append(root);
  const T = preview ? 150 : 300;

  const rand = gsap.utils.random;
  // These tweens are made in click/timer handlers, outside any context, so they are
  // finite and killTweensOf() in the cleanup covers whatever is still alive.
  const actions: Array<[string, () => void]> = [
    ['to(A, { x })', () => void gsap.to(a, { x: rand(0, T, 1), duration: 2.2 })],
    ['to(A, { rotation })', () => void gsap.to(a, { rotation: rand(-180, 180, 1), duration: 2.6 })],
    ['to([A, B], { opacity })', () => void gsap.to([a, b], { opacity: 0.35, duration: 0.4, repeat: 5, yoyo: true })],
    ['to(B, { x })', () => void gsap.to(b, { x: rand(0, T, 1), duration: 2 })],
    ['killTweensOf(A, "x")', () => gsap.killTweensOf(a, 'x')],
    ['killTweensOf(A)', () => gsap.killTweensOf(a)],
  ];
  const note = (text: string): void => {
    log.textContent = text;
  };

  const readPanel = (): void => {
    panel.textContent =
      `getTweensOf(A).length        ${gsap.getTweensOf(a).length}\n` +
      `getTweensOf([A, B]).length   ${gsap.getTweensOf([a, b]).length}\n` +
      `isTweening(A)                ${gsap.isTweening(a)}\n` +
      `isTweening(B)                ${gsap.isTweening(b)}`;
  };
  gsap.ticker.add(readPanel);

  let timer = 0;
  if (preview) {
    let i = 0;
    const next = (): void => {
      const [label, fn] = actions[i % actions.length] as [string, () => void];
      i++;
      fn();
      note(label);
    };
    next();
    timer = window.setInterval(next, 1300);
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    for (const [label, fn] of actions) {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        fn();
        note(`ran gsap.${label}`);
      });
      bar.append(btn);
    }
    root.insertBefore(bar, panel);
    note('Tweens are released once they finish, so the counts fall back to 0 on their own.');
  }

  return () => {
    window.clearInterval(timer);
    gsap.ticker.remove(readPanel);
    gsap.killTweensOf([a, b]);
  };
};

export default mount;
