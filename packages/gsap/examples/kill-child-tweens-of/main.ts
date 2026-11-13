// Three boxes race right; killChildTweensOf(".group") freezes the two inside the group and leaves the third
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { killChildTweensOf } from './killChildTweensOf.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const group = h('div', 'group', '', root);
  h('span', 'cap', '.group', group);
  const blue = h('div', 'box blue', '', h('div', 'lane', '', group));
  const green = h('div', 'box green', '', h('div', 'lane', '', group));
  const red = h('div', 'box red', '', h('div', 'lane', '', root));
  const readout = h('p', 'readout', '', root);

  const live: gsap.core.Tween[] = [];
  const timers: number[] = [];
  const dist = preview ? 150 : 300;
  const ctx = gsap.context((self) => {
    // Rebuilt on every round. Made inside ignore() so the context does not record a new
    // set of tweens each time, and killed by handle instead.
    self.add('start', () => {
      for (const t of live) t.kill();
      live.length = 0;
      self.ignore(() => {
        gsap.set([blue, green, red], { x: 0 });
        live.push(gsap.to([red, blue], { x: dist, duration: 2.4, ease: 'none' }));
        live.push(gsap.to(green, { x: dist, duration: 2.4, ease: 'none' }));
      });
      readout.textContent = 'all three tween to the right';
    });
  }, el);

  const start = (): void => ctx['start']();
  const kill = (): void => {
    killChildTweensOf(group);
    readout.textContent = 'killChildTweensOf(".group"): blue and green stop, red keeps going';
  };

  start();
  if (preview) {
    readout.remove();
    // one round = 3.6s: kill after 1.1s, restart at the end
    const round = (): void => {
      start();
      timers.push(window.setTimeout(kill, 1100));
    };
    round();
    timers.push(window.setInterval(round, 3600));
  } else {
    const bar = h('div', 'controls', '', root);
    btn('killChildTweensOf(".group")', kill, bar);
    btn('restart', start, bar);
  }

  return () => {
    for (const t of timers) { window.clearTimeout(t); window.clearInterval(t); }
    for (const t of live) t.kill();
    ctx.revert();
  };
};

export default mount;
