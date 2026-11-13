// Three tweens and a timeline run one after another by chaining then() promises
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const dots = [0, 1, 2].map(() => h('div', 'dot', '', h('div', 'lane', '', wrap))) as unknown as [
    HTMLElement,
    HTMLElement,
    HTMLElement,
  ];
  const out = h('pre', 'readout', '', wrap);
  const lines: string[] = [];
  const log = (s: string): void => {
    lines.push(s);
    if (lines.length > 6) lines.shift();
    out.textContent = lines.join('\n');
  };

  let alive = true;
  let timer = 0;
  const ctx = gsap.context(() => {
    const dist = (): number => (wrap.clientWidth || 240) - 26;
    const make = (dot: HTMLElement, vars: gsap.TweenVars) =>
      gsap.to(dot, { x: dist, duration: 0.7, ease: 'power2.inOut', paused: true, ...vars });
    const a = make(dots[0], {});
    const b = make(dots[1], { duration: 0.5 });
    const tl = gsap.timeline({ paused: true });
    tl.to(dots[2], { x: dist, duration: 0.4 }).to(dots[2], { rotation: 360, duration: 0.4 });

    const reset = (): void => {
      // pause(0) seeks back and renders; no new tween is created per run
      a.pause(0);
      b.pause(0);
      tl.pause(0);
    };

    const run = (): void => {
      lines.length = 0;
      log('restart() on tween A');
      // then() resolves when the animation completes; returning another animation waits for it too.
      a.restart()
        .then(() => {
          log('A resolved, starting B');
          return b.restart();
        })
        .then(() => {
          log('B resolved, starting the timeline');
          return tl.restart();
        })
        .then(() => {
          log('timeline resolved, all done');
          if (alive && preview) timer = window.setTimeout(() => { reset(); run(); }, 900);
        });
    };
    if (preview) run();
    else {
      log('press run to chain A, B and the timeline');
      const bar = h('div', 'bar', '', wrap);
      btn('run chain', () => { reset(); run(); }, bar);
    }
  }, el);

  return () => {
    alive = false;
    clearTimeout(timer);
    ctx.revert();
  };
};

export default mount;
