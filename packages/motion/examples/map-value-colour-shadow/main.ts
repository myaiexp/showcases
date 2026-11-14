// One temperature mapped by mapValue to border colour, box-shadow strings and thermometer height
import { animate, mapValue, motionValue, scopeMotion, styleEffect } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="tile${preview ? '' : ' big'}">
      <div class="therm"><div class="mercury"></div></div>
      <div><div class="num">18</div><div class="cap">living room, &deg;C</div></div>
    </div>`;
  const num = el.querySelector<HTMLElement>('.num')!;
  const temp = motionValue(18);
  const cancels: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    // Three colour stops: cold blue, mild yellow, hot red.
    const colour = mapValue(temp, [10, 22, 34], ['#3b82f6', '#f5d142', '#ef4444']);
    // Complex strings: every stop must have the same numbers and colours in the same order.
    const glow = mapValue(temp, [10, 22, 34], [
      '0px 0px 6px 0px rgba(59, 130, 246, 0.25)',
      '0px 0px 22px 4px rgba(245, 209, 66, 0.4)',
      '0px 0px 34px 8px rgba(239, 68, 68, 0.6)',
    ]);
    cancels.push(styleEffect('.tile', { borderColor: colour, boxShadow: glow }));
    cancels.push(styleEffect('.mercury', { backgroundColor: colour, scaleY: mapValue(temp, [10, 34], [0.12, 1]) }));
    cancels.push(temp.on('change', (v) => { num.textContent = String(Math.round(v)); }));

    if (preview) {
      animate(temp, [12, 33, 12], { duration: 7, repeat: Infinity, ease: 'easeInOut' });
    } else {
      hint(el, 'Drag the temperature. Border colour, glow and the thermometer are all mapValue outputs of the same number, and in between stops the colours blend.');
      p = panel(el);
      p.slider('temperature', { min: 10, max: 34, step: 1, value: 18 }, (v) => temp.set(v));
      p.button('Heat wave', bind(() => { animate(temp, 34, { duration: 2 }); }));
      p.button('Cold snap', bind(() => { animate(temp, 10, { duration: 2 }); }));
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
