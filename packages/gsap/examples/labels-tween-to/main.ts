// A paused timeline with labels; buttons scrub its playhead with tweenTo, tweenFromTo and seek
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const LABELS = ['one', 'two', 'three', 'four'] as const;
const STOPS = [
  { x: 0, y: 0, color: '#4f9cff' },
  { x: 1, y: 1, color: '#34c38f' },
  { x: 0, y: 1, color: '#f2a33a' },
  { x: 1, y: 0, color: '#d05bd0' },
];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const dot = document.createElement('div');
  dot.className = 'dot';
  stage.append(dot);
  const readout = document.createElement('p');
  readout.className = 'readout';
  el.append(stage, readout);

  const cleanups: Array<() => void> = [];
  let current: gsap.core.Animation | undefined;
  const ctx = gsap.context((self) => {
    const W = preview ? 150 : 220;
    const H = preview ? 80 : 120;
    stage.style.width = `${W + 40}px`;
    stage.style.height = `${H + 40}px`;

    // Each label marks a corner; the tween after it moves the dot to the next corner.
    const tl = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'power2.inOut' } });
    const first = STOPS[0];
    if (first) gsap.set(dot, { x: first.x * W, y: first.y * H, backgroundColor: first.color });
    LABELS.forEach((label, i) => {
      tl.addLabel(label);
      const next = STOPS[(i + 1) % STOPS.length];
      if (next) tl.to(dot, { x: next.x * W, y: next.y * H, backgroundColor: next.color });
    });
    tl.addLabel('end');

    // tweenTo/seek calls run outside the context (ignore) and only the latest tween is kept,
    // so repeated calls don't pile up in ctx.data.
    const run = (fn: () => unknown): void => {
      current?.kill();
      self.ignore(() => {
        const r = fn();
        current = r instanceof gsap.core.Tween ? r : undefined;
      });
    };

    const show = (): void => {
      readout.textContent = preview
        ? `"${tl.currentLabel()}"  ${tl.time().toFixed(2)}s`
        : `currentLabel(): "${tl.currentLabel()}"   time(): ${tl.time().toFixed(2)}s`;
    };
    tl.eventCallback('onUpdate', show);
    show();

    if (preview) {
      // Hop between labels on a timer so the card looks alive without input.
      let i = 0;
      const id = window.setInterval(() => {
        i = (i + 1) % LABELS.length;
        run(() => tl.tweenTo(LABELS[i] ?? 0));
      }, 1500);
      cleanups.push(() => window.clearInterval(id));
      return;
    }

    const bar = document.createElement('div');
    bar.className = 'bar';
    const btn = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', () => run(fn));
      bar.append(b);
    };
    for (const label of LABELS) btn(`tweenTo("${label}")`, () => tl.tweenTo(label));
    btn('tweenTo("one", ease "none")', () => tl.tweenTo('one', { ease: 'none', duration: 0.6 }));
    btn('tweenFromTo("one","three")', () => tl.tweenFromTo('one', 'three'));
    btn('seek("two")', () => tl.seek('two'));
    btn('resume()', () => tl.resume());
    el.append(bar);
    cleanups.push(() => bar.remove());
  }, el);

  return () => {
    for (const fn of cleanups) fn();
    current?.kill();
    ctx.revert();
  };
};

export default mount;
