// animate(motionValue, colour): each new animate() ends the one still running on that value
import { animate, delay, motionValue, scopeMotion, styleEffect } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const COLOURS = ['#ff5d5d', '#ffb347', '#f5e663', '#3ddc84', '#4cc9f0', '#8a6bff', '#ff7ac6'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="rig${preview ? '' : ' big'}">
      <div class="preview"></div>
      <div class="swatches">${COLOURS.map((c) => `<button class="swatch" aria-label="${c}" style="background:${c}"></button>`).join('')}</div>
      <div class="count"></div>
    </div>`;
  const view = el.querySelector<HTMLElement>('.preview')!;
  const count = el.querySelector<HTMLElement>('.count')!;
  const colour = motionValue(COLOURS[0]!);
  let started = 0;
  let cut = 0;
  const cancels: VoidFunction[] = [];
  const show = (): void => { count.textContent = `${started} fades started, ${cut} cut short`; };

  const scope = scopeMotion(el, ({ bind }) => {
    cancels.push(styleEffect(view, { backgroundColor: colour }));
    cancels.push(colour.on('animationStart', () => { started++; show(); }));
    cancels.push(colour.on('animationCancel', () => { cut++; show(); }));
    cancels.push(colour.on('change', (v) => { view.textContent = String(v).replace(/\s/g, '').slice(0, 24); }));
    show();
    const pick = bind((i: number): void => {
      el.querySelectorAll('.swatch').forEach((s, n) => s.classList.toggle('on', n === i));
      // No stop() needed first: animating a motion value ends whatever was already animating it.
      animate(colour, COLOURS[i]!, { duration: preview ? 1.2 : 1.8, ease: 'easeInOut' });
    });
    el.querySelectorAll('.swatch').forEach((s, i) => s.addEventListener('click', () => pick(i)));
    if (preview) {
      let n = 0;
      const loop = (): void => { pick(++n % COLOURS.length); delay(loop, 0.7); };
      delay(loop, 0.5);
    } else {
      hint(el, 'Click swatches quickly. Each fade takes nearly two seconds, so the next click retargets from the colour on screen right now; the counter shows the cut-short ones.');
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); };
};

export default mount;
