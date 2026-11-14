// FAQ: change the marker shape in tooltip rows with shapeType
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

const QS = QUARTERS.slice(0, 5);
const SHAPES = ['circle', 'rect', 'rectRound', 'square', 'diamond', 'triangle'];

const build = (shapeType: string, size: number): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values: groupedRows(QS, ['North', 'South', 'East'], 21) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  legends: { visible: false },
  tooltip: {
    activeType: ['dimension'],
    // The row marker: shapeType picks the symbol, 'rect' gives a line-like swatch, 'rectRound' a rounded one.
    dimension: { content: [{ key: (d) => d?.c, value: (d) => d?.y, shapeType }] },
    style: { shape: { size, spacing: 8 } },
  },
});

const mount: Mount = (el, ctx) => {
  let shape = ctx.preview ? 'rectRound' : 'circle';
  let size = 12;
  const { vchart, release } = createChart(el, ctx, build(shape, size));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(shape, size));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'shapeType', SHAPES, (v) => {
      shape = v;
      apply();
    });
    slider(bar, 'style.shape.size', [6, 24, 1], size, (v) => {
      size = v;
      apply();
    });
  }
  let i = 0;
  const stop = every(1300, () => {
    i += 1;
    if (ctx.preview && i % 3 === 0) {
      shape = pick(SHAPES, i / 3);
      apply();
    }
    vchart.setDimensionIndex(pick(QS, i));
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
