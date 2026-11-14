// Two spring needles: default rest thresholds against loose ones, timed to the finish
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const gauge = (name: string): string => `
  <figure class="g" data-g="${name}">
    <div class="dial"><i class="needle"></i></div>
    <figcaption><b>${name}</b><span class="took">-</span></figcaption>
  </figure>`;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="gauges">${gauge('default')}${gauge('custom')}</div>`;

  const custom = { restSpeed: 30, restDelta: 6 };
  let raised = false;

  const scope = scopeMotion(el, (s) => {
    const swing = async (name: string, rest: { restSpeed?: number; restDelta?: number }): Promise<void> => {
      const needle = `[data-g="${name}"] .needle`;
      const took = el.querySelector(`[data-g="${name}"] .took`) as HTMLElement;
      const t0 = performance.now();
      took.textContent = '...';
      // The same wobbly spring for both. Only the rest thresholds differ.
      await s.run(() => animate(needle, { rotate: raised ? [60, -50] : [-50, 60] }, { type: 'spring', stiffness: 120, damping: 4, ...rest }));
      if (s.state === 'active') took.textContent = `stopped after ${((performance.now() - t0) / 1000).toFixed(1)}s`;
    };
    const both = (): void => {
      void swing('default', {});
      void swing('custom', custom);
      raised = !raised;
    };
    both();

    if (preview) {
      const tick = (): void => {
        both();
        delay(tick, 5);
      };
      delay(tick, 5);
      return;
    }
    const p = panel(el);
    p.slider('restSpeed', { min: 0.1, max: 100, step: 0.1, value: custom.restSpeed }, (v) => { custom.restSpeed = v; });
    p.slider('restDelta', { min: 0.01, max: 20, step: 0.01, value: custom.restDelta }, (v) => { custom.restDelta = v; });
    p.button('Swing both', both);
    hint(el, 'The spring ends when it is slower than restSpeed and closer than restDelta. Raise them and it stops while still visibly quivering; lower them and it keeps shimmering.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
