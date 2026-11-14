// The same dot animation repeated with repeatType loop, reverse and mirror
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const TYPES = ['loop', 'reverse', 'mirror'] as const;
const EASES = ['easeIn', 'easeOut', 'easeInOut', 'linear'] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="rows">${TYPES.map((t) => `
    <div class="row" data-type="${t}">
      <code>${t}</code>
      <div class="track"><span class="dot"></span></div>
    </div>`).join('')}</div>`;

  let seconds = 1;
  let ease: (typeof EASES)[number] = 'easeIn';
  const running: Array<{ stop: () => void }> = [];

  const scope = scopeMotion(el, () => {
    const start = (): void => {
      for (const a of running.splice(0)) a.stop();
      for (const t of TYPES) {
        // Same keyframes, same ease, same duration. Only repeatType differs.
        running.push(animate(`[data-type="${t}"] .dot`, { x: [0, 150], scale: [1, 1.5] }, {
          duration: seconds,
          ease,
          repeat: Infinity,
          repeatType: t,
        }));
      }
    };
    start();

    if (preview) return;
    const p = panel(el);
    p.slider('seconds', { min: 0.4, max: 3, step: 0.1, value: seconds }, (v) => { seconds = v; start(); });
    p.select('ease', EASES, ease, (v) => { ease = v; start(); });
    hint(el, 'With an easing that is not symmetrical (easeIn), reverse retraces the path in the opposite curve while mirror runs the same curve back. With linear they look the same.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
