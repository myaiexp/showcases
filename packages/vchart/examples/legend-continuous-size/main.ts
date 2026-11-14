// Continuous size legend on a scatter chart: sizeBackground and a filtered size range
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, slider, every } from '../../shared/chart.ts';
import { scatterPoints } from '../../shared/components-data.ts';

const spec: ISpec = {
  type: 'scatter',
  data: [{ id: 'points', values: scatterPoints(48, 5) }],
  xField: 'x',
  yField: 'y',
  sizeField: 'size',
  size: { type: 'linear', domain: [{ dataId: 'points', fields: ['size'] }], range: [6, 30] },
  axes: [
    { orient: 'bottom', type: 'linear' },
    { orient: 'left', type: 'linear' },
  ],
  point: { style: { fill: '#38bdf8', fillOpacity: 0.7 } },
  legends: {
    visible: true,
    type: 'size',
    field: 'size',
    orient: 'right',
    title: { visible: true, text: 'Volume' },
    handlerText: { visible: true },
    sizeBackground: { fill: '#475569', fillOpacity: 0.6 },
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
    let t = 0;
    stop = every(140, () => {
      t += 1;
      const lo = Math.round(45 - 40 * Math.cos(t / 14));
      range(lo, Math.min(100, lo + 40));
    });
  } else {
    const bar = controlBar(el);
    let lo = 10;
    let hi = 100;
    slider(bar, 'min size', [10, 100, 1], lo, (v) => ((lo = Math.min(v, hi)), range(lo, hi)));
    slider(bar, 'max size', [10, 100, 1], hi, (v) => ((hi = Math.max(v, lo)), range(lo, hi)));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
