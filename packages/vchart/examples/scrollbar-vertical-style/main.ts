// A vertical ScrollBar: rail and slider styles, round, innerPadding and filterMode
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select } from '../../shared/chart.ts';
import { rng, slideWindow } from '../../shared/components-data.ts';

const data = (() => {
  const r = rng(88);
  return Array.from({ length: 26 }, (_, i) => ({ team: `Team ${String.fromCharCode(65 + i)}`, score: Math.round(20 + r() * 80) }));
})();

const build = (filterMode: 'axis' | 'filter', round: boolean): ISpec => ({
  type: 'bar',
  direction: 'horizontal',
  data: [{ id: 'scores', values: data }],
  xField: 'score',
  yField: 'team',
  bar: { style: { fill: '#f472b6' } },
  axes: [
    { orient: 'left', type: 'band', inverse: true },
    { orient: 'bottom', type: 'linear' },
  ],
  scrollBar: [
    {
      orient: 'right',
      start: 0,
      end: 0.3,
      filterMode,
      round,
      width: 14,
      innerPadding: [2, 2, 2, 2],
      rail: { style: { fill: 'rgba(244,114,182,0.12)' } },
      slider: { style: { fill: '#f472b6', fillOpacity: 0.7 } },
    },
  ],
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('axis', true));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    stop = slideWindow(vchart, 'scrollBar', 0.3, 90);
  } else {
    let mode: 'axis' | 'filter' = 'axis';
    let round = true;
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(mode, round));
    };
    const bar = controlBar(el);
    select(bar, 'filterMode', ['axis', 'filter'], (v) => ((mode = v as 'axis' | 'filter'), apply()));
    select(bar, 'round', ['true', 'false'], (v) => ((round = v === 'true'), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
