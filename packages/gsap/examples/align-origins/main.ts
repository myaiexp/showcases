// A box swings around a pivot dot: alignOrigins() moves its transform-origin to the dot without a jump
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { alignOrigins } from './alignOrigins.ts';
import './style.css';

// pivot positions as fractions of the stage
const PIVOTS: Array<[number, number]> = [
  [0.22, 0.25],
  [0.8, 0.3],
  [0.7, 0.85],
];

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const stage = h('div', 'stage', '', root);
  const box = h('div', 'box', 'box', stage);
  const dot = h('div', 'dot', '', stage);
  const readout = h('p', 'readout', '', root);

  const place = (fx: number, fy: number): void => {
    dot.style.left = `${fx * 100}%`;
    dot.style.top = `${fy * 100}%`;
  };
  place(0.5, 0.5);

  let loop: gsap.core.Timeline | undefined;
  // Automatic tour: move the pivot, align the origin to it, swing the box around it.
  // The helper makes gsap.set() calls, so each call() runs inside ignore(): a timeline that
  // repeats forever must not keep adding records to the context.
  const buildLoop = (self: gsap.Context): void => {
    const step = (i: number): void => {
      const [fx, fy] = PIVOTS[i] as [number, number];
      self.ignore(() => {
        place(fx, fy);
        alignOrigins(box, dot);
      });
      readout.textContent = `pivot ${i + 1}: alignOrigins(box, dot)  ->  ${getComputedStyle(box).transformOrigin}`;
    };
    const tl = gsap.timeline({ repeat: -1 });
    PIVOTS.forEach((_, i) => {
      tl.call(step, [i]).to(box, { rotation: '+=150', duration: 1.3, ease: 'sine.inOut' }, '>');
    });
    // back to the identity transform, so every cycle starts the same
    tl.to(box, { rotation: 0, x: 0, y: 0, duration: 0.8, ease: 'power2.inOut' });
    loop = tl;
  };
  const ctx = gsap.context((self) => buildLoop(self), el);

  const cleanups: Array<() => void> = [];
  if (preview) {
    readout.remove();
  } else {
    const bar = h('div', 'controls', '', root);
    stage.classList.add('clickable');
    // Manual mode: click the stage to put the pivot there, then the box swings 90 degrees around it.
    const onClick = (e: MouseEvent): void => {
      const r = stage.getBoundingClientRect();
      loop?.kill();
      ctx.add(() => {
        gsap.killTweensOf(box);
        place((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
        alignOrigins(box, dot);
        gsap.to(box, { rotation: '+=90', duration: 0.8, ease: 'power2.inOut' });
      });
      readout.textContent = `origin now ${getComputedStyle(box).transformOrigin}`;
    };
    stage.addEventListener('click', onClick);
    cleanups.push(() => stage.removeEventListener('click', onClick));
    btn('Auto tour', () => ctx.add(() => {
      gsap.killTweensOf(box);
      gsap.set(box, { rotation: 0, x: 0, y: 0 });
      buildLoop(ctx);
    }), bar);
    h('span', 'hint', 'or click the stage to place a pivot', bar);
  }

  return () => {
    for (const fn of cleanups) fn();
    ctx.revert();
  };
};

export default mount;
