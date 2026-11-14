// Two drawers toggled mid-flight: a spring inherits velocity, a tween restarts from rest
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="phones">
      ${(['spring', 'tween'] as const).map((k) => `
        <figure data-kind="${k}">
          <div class="phone"><div class="page"></div><nav class="drawer"><i></i><i></i><i></i></nav></div>
          <figcaption>${k === 'spring' ? 'spring' : 'tween (0.5s)'}</figcaption>
        </figure>`).join('')}
    </div>`;

  let open = false;

  const scope = scopeMotion(el, () => {
    const toggle = (): void => {
      open = !open;
      // Same target for both. A new animate() on x interrupts the old one.
      const x = open ? 0 : -100;
      animate('[data-kind="spring"] .drawer', { x: `${x}%` }, { type: 'spring', stiffness: 260, damping: 26 });
      animate('[data-kind="tween"] .drawer', { x: `${x}%` }, { type: 'tween', duration: 0.5, ease: 'easeInOut' });
    };
    animate('.drawer', { x: '-100%' }, { duration: 0 });

    if (preview) {
      // Irregular gaps: the later toggles land mid-animation on purpose.
      const gaps = [0.25, 0.25, 0.25, 1.4, 0.35, 0.2, 1.4];
      let step = 0;
      const tick = (): void => {
        toggle();
        delay(tick, gaps[step++ % gaps.length] as number);
      };
      delay(tick, 0.4);
      return;
    }
    const p = panel(el);
    p.button('Toggle', toggle);
    p.button('Mash x6', () => {
      let n = 0;
      const burst = (): void => {
        toggle();
        if (++n < 6) delay(burst, 0.18);
      };
      scope.run(burst);
    });
    hint(el, 'Tap Toggle twice quickly, or Mash. The spring turns around with its momentum; the tween snaps to a stop and starts over, and you can see the kink.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
