// An upload ring: one progress value feeds attrEffect for the SVG arc, its colour, aria-valuenow and a data attribute
import { animate, attrEffect, delay, mapValue, motionValue, scopeMotion, transformValue } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const R = 40;
const C = 2 * Math.PI * R;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="ring${preview ? '' : ' big'}" role="progressbar" aria-valuemin="0" aria-valuemax="100">
      <svg viewBox="0 0 100 100"><circle class="back" cx="50" cy="50" r="${R}"/><circle class="arc" cx="50" cy="50" r="${R}"/></svg>
    </div>
    <p class="file">holiday-photos.zip</p>`;
  const ring = el.querySelector<HTMLElement>('.ring')!;
  const arc = el.querySelector<SVGElement>('.arc')!;
  arc.setAttribute('stroke-dasharray', String(C));
  const progress = motionValue(0);
  const cancels: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    const percent = transformValue(() => Math.round(progress.get() * 100));
    // Attribute names are written as the DOM wants them; only aria and data are re-cased for you.
    cancels.push(attrEffect(arc, {
      'stroke-dashoffset': mapValue(progress, [0, 1], [C, 0]),
      stroke: mapValue(progress, [0, 0.5, 1], ['#ff5d5d', '#ffb347', '#3ddc84']),
    }));
    // ariaValuenow becomes aria-valuenow, dataPct becomes data-pct (the label reads it with CSS attr()).
    cancels.push(attrEffect(ring, { ariaValuenow: percent, dataPct: percent }));

    const upload = bind((): void => {
      progress.jump(0);
      animate(progress, 1, { duration: preview ? 3.5 : 3, ease: [0.4, 0, 0.6, 1] });
    });
    if (preview) {
      const loop = (): void => { upload(); delay(loop, 5); };
      loop();
    } else {
      hint(el, 'Start an upload or drag the slider. The arc, its colour, the percentage text and aria-valuenow all come from one value.');
      p = panel(el);
      p.button('Upload', upload);
      p.slider('progress', { min: 0, max: 100, step: 1, value: 0 }, (v) => progress.jump(v / 100));
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
