// Continuous color legend on a heatmap: slider, handle text and a filtered range
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, slider, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const COLS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ROWS = ['Dawn', 'Noon', 'Dusk', 'Night'];

const cells = (seed: number): { day: string; part: string; value: number }[] => {
  const r = rng(seed);
  return ROWS.flatMap((part) => COLS.map((day) => ({ day, part, value: Math.round(r() * 100) })));
};

const spec: ISpec = {
  type: 'common',
  data: [{ id: 'cells', values: cells(2) }],
  series: [
    {
      type: 'heatmap',
      xField: 'day',
      yField: 'part',
      valueField: 'value',
      cell: { style: { fill: { field: 'value', scale: 'color' } } },
    },
  ],
  axes: [
    { orient: 'bottom', type: 'band' },
    { orient: 'left', type: 'band' },
  ],
  // The linear color scale is what the continuous legend reads.
  color: { type: 'linear', domain: [{ dataId: 'cells', fields: ['value'] }], range: ['#1e3a8a', '#38bdf8', '#fde047', '#ef4444'] },
  legends: {
    visible: true,
    type: 'color',
    field: 'value',
    orient: 'right',
    title: { visible: true, text: 'Load' },
    handlerText: { visible: true },
    startText: { visible: true, text: 'low' },
    endText: { visible: true, text: 'high' },
    defaultSelected: [0, 100],
  },
};

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, spec);
  let released = false;
  const range = (lo: number, hi: number): void => {
    if (!released) vchart.setLegendSelectedDataByIndex(0, [lo, hi]);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // Sweep the legend slider: cells outside the selected range are filtered out.
    let t = 0;
    stop = every(120, () => {
      t += 1;
      const lo = 50 - 50 * Math.cos(t / 12) * 0.9 - 5;
      range(Math.max(0, Math.round(lo)), Math.min(100, Math.round(lo + 45)));
    });
  } else {
    const bar = controlBar(el);
    let lo = 0;
    let hi = 100;
    slider(bar, 'from', [0, 100, 1], lo, (v) => ((lo = Math.min(v, hi)), range(lo, hi)));
    slider(bar, 'to', [0, 100, 1], hi, (v) => ((hi = Math.max(v, lo)), range(lo, hi)));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
