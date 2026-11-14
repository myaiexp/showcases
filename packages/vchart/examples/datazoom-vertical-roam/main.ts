// Vertical DataZoom with roam (drag, zoom, scroll inside the chart) and minSpan / maxSpan
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, slider } from '../../shared/chart.ts';
import { rng, slideWindow } from '../../shared/components-data.ts';

const data = (() => {
  const r = rng(61);
  return Array.from({ length: 30 }, (_, i) => ({ name: `Item ${String(i + 1).padStart(2, '0')}`, value: Math.round(10 + r() * 90) }));
})();

const build = (roam: string, minSpan: number, maxSpan: number): ISpec => ({
  type: 'bar',
  direction: 'horizontal',
  data: [{ id: 'bars', values: data }],
  xField: 'value',
  yField: 'name',
  bar: { style: { fill: '#a78bfa' } },
  axes: [
    { orient: 'left', type: 'band', inverse: true },
    { orient: 'bottom', type: 'linear' },
  ],
  dataZoom: [
    {
      orient: 'right',
      start: 0,
      end: 0.3,
      minSpan,
      maxSpan,
      // Each roam mode turns the chart body itself into a handle for the window.
      roamDrag: roam === 'drag',
      roamZoom: roam === 'zoom',
      roamScroll: roam === 'scroll',
    },
  ],
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('drag', 0.1, 0.6));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    stop = slideWindow(vchart, 'dataZoom', 0.3, 90);
  } else {
    let roam = 'drag';
    let min = 0.1;
    let max = 0.6;
    const bar = controlBar(el);
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(roam, min, max));
    };
    select(bar, 'roam', ['drag', 'zoom', 'scroll', 'off'], (v) => ((roam = v), apply()));
    slider(bar, 'minSpan', [0.05, 0.5, 0.05], min, (v) => ((min = Math.min(v, max)), apply()));
    slider(bar, 'maxSpan', [0.2, 1, 0.05], max, (v) => ((max = Math.max(v, min)), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
