// Each step is a function that changes state and returns an animation; the next only runs when it ends
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { progressiveBuild } from './progressiveBuild.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const stage = h('div', 'stage', '', root);
  const dots = Array.from({ length: 6 }, () => h('div', 'dot', '', stage));
  const caption = h('p', 'caption', '', root);

  let build: gsap.core.Timeline | undefined;
  const timers: number[] = [];

  const ctx = gsap.context(() => {}, el);
  const run = (): void => {
      build?.kill();
      gsap.set(dots, { clearProps: 'all' });
      // The helper keeps creating tweens from its own timeline long after this call, so the
      // build is kept out of the context's record and killed by handle.
      ctx.ignore(() => {
        build = progressiveBuild(
          () => {
            caption.textContent = 'step 1: dots pop in';
            return gsap.from(dots, { scale: 0, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' });
          },
          0.6, // a delay between two steps is just a number
          () => {
            caption.textContent = 'step 2: they rise into a wave';
            return gsap.to(dots, { y: (i: number) => -Math.sin((i / 5) * Math.PI) * 36, duration: 0.6, stagger: 0.06, ease: 'sine.inOut' });
          },
          () => {
            caption.textContent = 'step 3: and change colour';
            return gsap.to(dots, { backgroundColor: '#ff8709', scale: 1.3, duration: 0.5, stagger: 0.08 });
          },
          0.8,
          () => {
            caption.textContent = 'step 4: sweep away';
            return gsap.to(dots, { x: 140, autoAlpha: 0, duration: 0.6, stagger: 0.07, ease: 'power2.in' });
          },
          () => {
            caption.textContent = 'done';
            // the last step just waits, then asks for another run (outside the timeline callback)
            return gsap.delayedCall(preview ? 0.8 : 0.1, () => {
              if (preview) timers.push(window.setTimeout(run, 0));
            });
          },
        );
      });
  };

  run();
  if (!preview) {
    const bar = h('div', 'controls', '', root);
    btn('replay', run, bar);
  }

  return () => {
    for (const t of timers) window.clearTimeout(t);
    build?.kill();
    gsap.set(dots, { clearProps: 'all' });
    ctx.revert();
  };
};

export default mount;
