// markLine reference lines: y by aggregate type or value, x by category, with labels
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { walk } from '../../shared/components-data.ts';

const AGGREGATES = ['average', 'max', 'min', 'median'] as const;
type Aggregate = (typeof AGGREGATES)[number];

const build = (agg: Aggregate, rows: ReturnType<typeof walk>, compact = false): ISpec => ({
  type: 'bar',
  data: [{ id: 'bars', values: rows }],
  xField: 'x',
  yField: 'y',
  bar: { style: { fill: '#38bdf8', fillOpacity: 0.8 } },
  axes: [{ orient: 'left', max: 100 }, { orient: 'bottom', label: { autoHide: true } }],
  markLine: [
    {
      // A y alone draws a horizontal line across the plot; a string value is an aggregate type.
      y: agg,
      line: { style: { stroke: '#fbbf24', lineWidth: 2, lineDash: [6, 4] } },
      label: { position: 'insideEndTop', text: agg, labelBackground: { visible: true, style: { fill: '#fbbf24' } }, style: { fill: '#0f172a', fontWeight: 'bold' } },
      endSymbol: { visible: true, symbolType: 'triangle', size: 8, style: { fill: '#fbbf24' } },
    },
    {
      // A number is a plain value on the y axis.
      y: 80,
      line: { style: { stroke: '#f87171', lineWidth: 1 } },
      label: { visible: !compact, position: 'insideStartTop', text: 'target 80', style: { fill: '#f87171' } },
    },
    {
      // An x alone draws a vertical line through the category.
      x: 'D06',
      line: { style: { stroke: '#a3e635', lineWidth: 1, lineDash: [2, 3] } },
      label: { visible: !compact, position: 'insideEndTop', text: 'release', style: { fill: '#a3e635' } },
    },
  ],
});

const mount: Mount = (el, ctx) => {
  let agg: Aggregate = 'average';
  let seed = 3;
  const { vchart, release } = createChart(el, ctx, build(agg, walk(12, seed), ctx.preview));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(agg, walk(12, seed), ctx.preview));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // The aggregate lines are computed from the data, so new data moves them.
    stop = every(2200, () => {
      seed += 1;
      agg = AGGREGATES[seed % AGGREGATES.length] as Aggregate;
      apply();
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'y: aggregate type', AGGREGATES, (v) => ((agg = v as Aggregate), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
