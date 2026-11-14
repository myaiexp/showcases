// Chart lifecycle events logged with timestamps
import VChart from '@visactor/vchart';
import type { ISpec } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { THEME, button, controlBar, every, readout } from '../../shared/chart.ts';
import { eventLog, salesRows } from '../../shared/events-data.ts';

const EVENTS = ['initialized', 'rendered', 'layoutStart', 'layoutEnd', 'renderFinished', 'animationFinished', 'afterResize'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const container = document.createElement('div');
  container.style.cssText = `width:100%;height:${ctx.preview ? 105 : 340}px`;
  el.append(container);
  const out = readout(el);
  const log = eventLog(out, ctx.preview ? 5 : 12, false);

  // The listeners must be attached before renderSync to see 'initialized' and 'rendered', so this
  // example builds the VChart itself instead of using createChart (which renders straight away).
  const spec = { type: 'bar', data: [{ id: 'sales', values: salesRows }], xField: ['day', 'team'], yField: 'sales', seriesField: 'team' } as ISpec;
  const vchart = new VChart(spec, { theme: THEME, dom: container });
  const t0 = performance.now();
  for (const name of EVENTS) vchart.on(name, () => log(`${String(Math.round(performance.now() - t0)).padStart(5)} ms  ${name}`));
  vchart.renderSync();

  let released = false;
  let k = 0;
  const update = (): void => {
    if (released) return;
    k += 1;
    void vchart.updateData('sales', salesRows.map((d, i) => ({ ...d, sales: 8 + ((i * 7 + k * 13) % 32) })));
  };
  const resize = (): void => {
    if (released) return;
    k += 1;
    // resize() sets the chart size explicitly and fires afterResize.
    const w = container.clientWidth;
    void vchart.resize(k % 2 ? Math.round(w * 0.7) : w, container.clientHeight);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(2200, () => (++i % 3 ? update() : resize()));
  } else if (bar) {
    button(bar, 'updateData', update);
    button(bar, 'vchart.resize', resize);
  }

  return () => {
    released = true;
    stop();
    vchart.release();
    container.remove();
  };
};

export default mount;
