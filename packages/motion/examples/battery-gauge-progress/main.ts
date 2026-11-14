// A battery gauge from a raw voltage: progress() turns it into 0-1, clamp() keeps it in range
import { animate, clamp, motionValue, progress, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

// A cell reads 3.2V when empty and 4.2V when full.
const EMPTY = 3.2;
const FULL = 4.2;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="phone${preview ? '' : ' full'}">
      <div class="battery"><div class="level"></div><span class="pct"></span></div>
      <code class="steps"></code>
    </div>`;
  const level = el.querySelector<HTMLElement>('.level')!;
  const pct = el.querySelector<HTMLElement>('.pct')!;
  const steps = el.querySelector<HTMLElement>('.steps')!;
  let useClamp = true;
  let volts = 3.9;
  let p: ReturnType<typeof panel> | undefined;
  const cancels: VoidFunction[] = [];

  const draw = (v: number): void => {
    // progress(start, end, value): where does v sit between empty and full? It can go below 0 or above 1.
    const raw = progress(EMPTY, FULL, v);
    // clamp(min, max, value) keeps the gauge inside its frame.
    const shown = useClamp ? clamp(0, 1, raw) : raw;
    level.style.transform = `scaleX(${Math.max(0, shown)})`;
    level.dataset.state = shown < 0.2 ? 'low' : shown < 0.5 ? 'mid' : 'ok';
    pct.textContent = `${Math.round(shown * 100)}%`;
    steps.textContent = `progress(${EMPTY}, ${FULL}, ${v.toFixed(2)}) = ${raw.toFixed(2)}${useClamp ? `, clamp -> ${shown.toFixed(2)}` : ''}`;
  };

  const scope = scopeMotion(el, () => {
    const drain = motionValue(volts);
    cancels.push(drain.on('change', draw));
    if (preview) {
      animate(drain, [4.3, 3.1], { duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'linear' });
    } else {
      draw(volts);
      hint(el, 'Slide the voltage past either end. Without clamp the raw progress goes below 0 or above 1 and the gauge overshoots its frame; with it, the level stays put.');
      p = panel(el);
      p.slider('voltage (V)', { min: 3.0, max: 4.4, step: 0.01, value: volts }, (v) => { volts = v; drain.set(v); });
      p.toggle('clamp to 0-1', true, (v) => { useClamp = v; draw(drain.get()); });
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
