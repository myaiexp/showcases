// Brush styling: inBrush and outOfBrush mark styles, plus the selection box style
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select } from '../../shared/chart.ts';
import { line, scatterPoints, simulateDrag } from '../../shared/components-data.ts';

const data = scatterPoints(80, 37);

const STYLES = {
  dim: { inBrush: { colorAlpha: 1 }, outOfBrush: { colorAlpha: 0.15 } },
  recolor: { inBrush: { color: '#fbbf24', symbolSize: 14 }, outOfBrush: { color: '#475569', symbolSize: 6 } },
  shape: { inBrush: { symbol: 'diamond', symbolSize: 16 }, outOfBrush: { symbol: 'circle', colorAlpha: 0.3 } },
} as const;

const build = (style: keyof typeof STYLES): ISpec => ({
  type: 'scatter',
  data: [{ id: 'points', values: data }],
  xField: 'x',
  yField: 'y',
  seriesField: 'type',
  axes: [
    { orient: 'left', type: 'linear' },
    { orient: 'bottom', type: 'linear' },
  ],
  legends: { visible: true, orient: 'top' },
  brush: {
    brushType: 'rect',
    ...STYLES[style],
    // style is the selection box itself
    style: { fill: '#fbbf24', fillOpacity: 0.12, stroke: '#fbbf24', lineWidth: 1 },
  },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release, container } = createChart(el, ctx, build('recolor'));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    const names = Object.keys(STYLES) as (keyof typeof STYLES)[];
    let i = 0;
    let cancel = (): void => {};
    const next = (): void => {
      if (released) return;
      const name = names[i % names.length] as keyof typeof STYLES;
      i += 1;
      void vchart.updateSpec(build(name)).then(() => {
        if (!released) cancel = simulateDrag(container, line([0.3, 0.3], [0.7, 0.72]), { holdMs: 1500, onDone: next });
      });
    };
    next();
    stop = () => cancel();
  } else {
    const bar = controlBar(el);
    select(bar, 'in / out styles', Object.keys(STYLES), (v) => {
      if (!released) void vchart.updateSpec(build(v as keyof typeof STYLES));
    }).value = 'recolor';
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
