// A handle moved by animate() with a gauge on getVelocity(): the needle follows how fast the value changes
import { animate, cancelFrame, delay, frame, mapValue, motionValue, scopeMotion, styleEffect } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const MAX_SPEED = 1500; // pixels per second at the end of the dial

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="rig${preview ? '' : ' big'}">
      <div class="gauge"><div class="needle"></div><div class="hub"></div></div>
      <div class="track"><div class="handle"></div></div>
      <div class="read"></div>
    </div>`;
  const track = el.querySelector<HTMLElement>('.track')!;
  const read = el.querySelector<HTMLElement>('.read')!;
  const x = motionValue(0);
  const speed = motionValue(0);
  const cancels: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;
  let right = false;

  const scope = scopeMotion(el, ({ bind }) => {
    cancels.push(styleEffect('.handle', { x }));
    cancels.push(styleEffect('.needle', { rotate: mapValue(speed, [0, MAX_SPEED], [-90, 90]) }));

    // Velocity is only meaningful while time passes, so a frame loop samples it.
    const sample = (): void => {
      speed.set(Math.min(Math.abs(x.getVelocity()), MAX_SPEED));
      read.textContent = `get() ${x.get().toFixed(0).padStart(4)}   getVelocity() ${x.getVelocity().toFixed(0).padStart(5)} px/s`;
    };
    frame.update(sample, true);
    cancels.push(() => cancelFrame(sample));

    const travel = (): number => track.clientWidth - 24;
    const go = bind((kind: 'spring' | 'ease' | 'snap'): void => {
      right = !right;
      const to = right ? travel() : 0;
      if (kind === 'spring') animate(x, to, { type: 'spring', stiffness: 120, damping: 12 });
      else if (kind === 'ease') animate(x, to, { duration: 1.2, ease: 'easeInOut' });
      else animate(x, to, { duration: 0.2, ease: 'easeOut' });
    });
    if (preview) {
      const kinds = ['spring', 'ease', 'snap'] as const;
      let n = 0;
      const loop = (): void => { go(kinds[n++ % 3]!); delay(loop, 2); };
      loop();
    } else {
      hint(el, 'Send the handle across three ways and compare the needle: a bouncy spring overshoots and speeds up twice, an eased move peaks in the middle, a quick snap pegs the gauge.');
      p = panel(el);
      p.button('Spring', () => go('spring'));
      p.button('Eased', () => go('ease'));
      p.button('Snap', () => go('snap'));
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
