// A logo badge spun with animate(): once by CSS selector, once by passing elements
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="badges">
      <div class="badge big"><span>M</span></div>
      <div class="badge"><span>m</span></div>
      <div class="badge"><span>m</span></div>
    </div>`;

  const scope = scopeMotion(el, () => {
    // A CSS selector: every match spins. Inside a scope it only searches this example.
    const bySelector = (): void => {
      animate('.badge', { rotate: [0, 360] }, { duration: 1 });
    };
    // Elements: you choose exactly which ones, here only the big badge.
    const byElements = (): void => {
      const bigOnes = el.querySelectorAll('.badge.big');
      animate(bigOnes, { rotate: [0, 360] }, { duration: 1 });
    };

    if (preview) {
      const tick = (): void => {
        bySelector();
        delay(tick, 2);
      };
      delay(tick, 0.4);
      return;
    }
    const p = panel(el);
    p.button("animate('.badge', ...)", bySelector);
    p.button('animate(elements, ...)', byElements);
    hint(el, 'The first button names the badges with a CSS selector and all three spin. The second hands animate() just the big badge. Both are rotate: 360 (written here as [0, 360] so it can replay).');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
