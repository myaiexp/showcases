// Reading a legend's items and selection through its id, and setting the selection from code
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { SERIES, barSpec } from '../../shared/api-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  // The legend's `id` in the spec ('legend', set by barSpec) is what the API looks it up by.
  const { vchart, release } = createChart(el, ctx, barSpec({ legend: true }));
  const out = bar ? readout(el) : null;
  let alive = true;

  const show = (): void => {
    if (!alive || !out) return;
    const items = vchart.getLegendDataById('legend');
    const selected = vchart.getLegendSelectedDataById('legend');
    out.textContent =
      `getLegendDataById('legend')          -> ${JSON.stringify(items.map((d) => (d as { key?: string }).key ?? d))}\n` +
      `getLegendSelectedDataById('legend')  -> ${JSON.stringify(selected)}`;
  };
  const choose = (keys: string[]): void => {
    if (!alive) return;
    vchart.setLegendSelectedDataById('legend', keys);
    show();
  };
  if (bar) {
    for (const s of SERIES) button(bar, `only ${s}`, () => choose([s]));
    button(bar, 'all', () => choose([...SERIES]));
    button(bar, 'none', () => choose([]));
    show();
    return () => {
      alive = false;
      release();
    };
  }
  const steps = [[SERIES[0]], [SERIES[1]], [SERIES[2]], [...SERIES]] as string[][];
  let i = 0;
  const stop = every(1500, () => choose(steps[i++ % steps.length] as string[]));
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
