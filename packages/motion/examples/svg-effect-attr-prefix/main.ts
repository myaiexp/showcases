// A bar chart: svgEffect with attrHeight/attrY (SVG attributes) against height/y (styles), switchable live
import { animate, delay, motionValue, scopeMotion, svgEffect, transformValue } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const H = 90; // chart height inside a 140 x 110 viewBox
const SVG_NS = 'http://www.w3.org/2000/svg';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="chart${preview ? '' : ' big'}"><svg viewBox="0 0 140 110"><line x1="0" x2="140" y1="${H}" y2="${H}"/></svg><p class="peek"></p></div>`;
  const svg = el.querySelector('svg')!;
  const peek = el.querySelector<HTMLElement>('.peek')!;
  const values = DAYS.map(() => motionValue(10));
  const rects = DAYS.map((d, i) => {
    const r = document.createElementNS(SVG_NS, 'rect');
    r.setAttribute('x', String(8 + i * 19));
    r.setAttribute('width', '13');
    r.setAttribute('rx', '2');
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('x', String(14.5 + i * 19));
    t.setAttribute('y', String(H + 12));
    t.textContent = d;
    svg.append(r, t);
    return r;
  });
  let cancels: VoidFunction[] = [];
  let asAttributes = true;
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    const bindEffects = (): void => {
      cancels.forEach((c) => c());
      for (const r of rects) { r.removeAttribute('style'); r.removeAttribute('height'); r.removeAttribute('y'); }
      cancels = rects.map((r, i) => {
        const height = values[i]!;
        const y = transformValue(() => H - height.get());
        // attrHeight / attrY write the attributes; plain height / y would write r.style instead.
        return asAttributes ? svgEffect(r, { attrHeight: height, attrY: y }) : svgEffect(r, { height, y });
      });
    };
    bindEffects();
    const newData = bind((): void => {
      values.forEach((v, i) => animate(v, 10 + Math.random() * 75, { type: 'spring', bounce: 0.3, visualDuration: 0.6, delay: i * 0.04 }));
    });
    const showMarkup = (): void => {
      const first = rects[0]!;
      peek.textContent = (first.outerHTML.replace(/ xmlns="[^"]*"/, '').replace(/(\d+\.\d{1})\d+/g, '$1')).slice(0, 110);
    };
    const tick = (): void => { showMarkup(); delay(tick, 0.25); };
    tick();
    newData();
    if (preview) {
      const loop = (): void => { newData(); delay(loop, 2); };
      delay(loop, 2);
    } else {
      hint(el, 'Press New data, then flip the switch and compare the first bar markup beneath the chart: attributes versus an inline style.');
      p = panel(el);
      p.button('New data', newData);
      p.toggle('Use attr prefix', true, (v) => { asAttributes = v; bindEffects(); newData(); });
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
