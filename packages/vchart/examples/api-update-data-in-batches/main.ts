// updateDataInBatches: two data ids replaced in one render
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout, type ISpec } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const CATS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const sales = (seed: number): { day: string; value: number }[] => {
  const r = rng(seed);
  return CATS.map((day) => ({ day, value: Math.round(30 + r() * 60) }));
};
const target = (seed: number): { day: string; goal: number }[] => {
  const r = rng(seed + 100);
  return CATS.map((day) => ({ day, goal: Math.round(40 + r() * 40) }));
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const spec = {
    type: 'common',
    data: [
      { id: 'sales', values: sales(1) },
      { id: 'target', values: target(1) },
    ],
    series: [
      { type: 'bar', dataId: 'sales', xField: 'day', yField: 'value' },
      { type: 'line', dataId: 'target', xField: 'day', yField: 'goal', point: { visible: true } },
    ],
    axes: [{ orient: 'left', max: 100, min: 0 }, { orient: 'bottom', type: 'band' }],
    legends: { visible: false },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);
  const out = bar ? readout(el) : null;

  let alive = true;
  let seed = 1;
  let renders = 0;
  vchart.on('layoutEnd', () => {
    renders += 1;
  });
  const batch = (): void => {
    if (!alive) return;
    seed += 1;
    // One call, one render: the entries are applied together.
    void vchart.updateDataInBatches([
      { id: 'sales', data: sales(seed) },
      { id: 'target', data: target(seed) },
    ]);
  };
  const separate = (): void => {
    if (!alive) return;
    seed += 1;
    void vchart.updateData('sales', sales(seed));
    void vchart.updateData('target', target(seed));
  };
  if (bar && out) {
    // Count the 'rendered' events a call produces: reset, call, then read after the animation settles.
    let timer = 0;
    const measure = (label: string, fn: () => void): void => {
      renders = 0;
      fn();
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        out.textContent = `${label}: ${renders} layout pass(es) (layoutEnd)`;
      }, 900);
    };
    button(bar, 'updateDataInBatches', () => measure('updateDataInBatches, two ids', batch));
    button(bar, 'two updateData calls', () => measure('two updateData calls', separate));
    return () => {
      alive = false;
      window.clearTimeout(timer);
      release();
    };
  }
  const stop = every(2200, batch);
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
