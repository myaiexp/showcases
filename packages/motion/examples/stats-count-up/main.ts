// Three dashboard figures counted up with animate(from, to, { onUpdate })
import { animate, delay, scopeMotion, stagger } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const STATS = [
  { label: 'Revenue', to: 48250, format: (v: number) => '$' + Math.round(v).toLocaleString('en-US') },
  { label: 'New signups', to: 1284, format: (v: number) => Math.round(v).toLocaleString('en-US') },
  { label: 'Uptime', to: 99.98, format: (v: number) => v.toFixed(2) + '%' },
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="stats">${STATS.map((s) => `<div class="stat"><span class="num"></span><small>${s.label}</small></div>`).join('')}</div>`;
  const outs = [...el.querySelectorAll('.num')];
  let seconds = 1.8;

  const scope = scopeMotion(el, () => {
    const run = (): void => {
      STATS.forEach((s, i) => {
        // A number from 0 to the figure. Nothing in the page is animated:
        // onUpdate receives the latest value and we print it.
        animate(0, s.to, {
          duration: seconds,
          delay: i * 0.15,
          ease: 'circOut',
          onUpdate: (v) => {
            const out = outs[i];
            if (out) out.textContent = s.format(v);
          },
        });
      });
      animate('.stat', { y: [10, 0], opacity: [0, 1] }, { duration: 0.4, delay: stagger(0.15) });
    };
    run();

    if (preview) {
      const tick = (): void => {
        run();
        delay(tick, seconds + 1.6);
      };
      delay(tick, seconds + 1.6);
      return;
    }
    const p = panel(el);
    p.slider('seconds', { min: 0.3, max: 5, step: 0.1, value: seconds }, (v) => { seconds = v; });
    p.button('Count again', run);
    hint(el, 'Each figure is its own animate(0, target) call. The fractions of uptime and the thousands separators are just formatting inside onUpdate.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
