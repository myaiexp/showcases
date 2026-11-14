// A signature drawn with pathLength, then a glint slid along it with pathOffset
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const SIGNATURE = 'M10 70 C 20 20, 40 10, 44 40 C 46 62, 30 78, 52 56 C 66 42, 70 40, 66 58 C 64 68, 82 52, 90 44 C 96 38, 98 50, 94 58 C 92 66, 108 56, 114 46 C 120 38, 122 56, 130 54 C 142 50, 150 28, 160 30 C 170 34, 150 72, 158 64 C 168 54, 176 46, 190 52 C 204 58, 210 64, 232 38';
const UNDERLINE = 'M14 84 C 70 94, 150 76, 236 86';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="sheet">
      <svg viewBox="0 0 250 100">
        <path class="ink" d="${SIGNATURE}"/>
        <path class="ink under" d="${UNDERLINE}"/>
        <path class="glint" d="${SIGNATURE}"/>
      </svg>
      <div class="line"><span>Sign here</span></div>
    </div>`;

  let seconds = 2.2;

  const scope = scopeMotion(el, () => {
    const sign = (): void => {
      // pathLength 0 to 1: the line grows along itself.
      animate('.ink:not(.under)', { pathLength: [0, 1] }, { duration: seconds, ease: 'easeInOut' });
      animate('.under', { pathLength: [0, 1] }, { duration: 0.5, delay: seconds + 0.1, ease: 'easeOut' });
      // A glint: a tenth of the path, pushed along with pathOffset.
      animate('.glint', { pathLength: [0.1, 0.1], pathOffset: [0, 0.9], opacity: [1, 1] }, { duration: 1.2, delay: seconds + 0.7, ease: 'easeInOut' });
      animate('.glint', { opacity: [0, 0] }, { duration: 0 });
    };
    sign();

    if (preview) {
      const tick = (): void => {
        sign();
        delay(tick, seconds + 3);
      };
      delay(tick, seconds + 3);
      return;
    }
    const p = panel(el);
    p.slider('seconds', { min: 0.5, max: 6, step: 0.1, value: seconds }, (v) => { seconds = v; });
    p.button('Sign again', sign);
    hint(el, 'pathLength is a progress from 0 to 1. The glint keeps pathLength at 0.1 and moves pathOffset from 0 to 0.9.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
