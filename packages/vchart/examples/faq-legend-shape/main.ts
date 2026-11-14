// FAQ: change the legend marker with legends.item.shape.style.symbolType
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

const CATEGORIES = [
  { type: 'Oxygen', value: 46.6 },
  { type: 'Silicon', value: 27.7 },
  { type: 'Aluminium', value: 8.1 },
  { type: 'Iron', value: 5 },
  { type: 'Calcium', value: 3.6 },
];
const SHAPES: Record<string, string> = {
  circle: 'circle',
  rect: 'rect',
  rectRound: 'rectRound',
  diamond: 'diamond',
  star: 'star',
  'custom path': 'M -1 -1 L 1 -1 L 0 1 Z',
};
const NAMES = Object.keys(SHAPES);

const build = (shape: string, size: number, orient: 'left' | 'right' | 'top' | 'bottom'): ISpec => ({
  type: 'pie',
  data: [{ id: 'd', values: CATEGORIES }],
  categoryField: 'type',
  valueField: 'value',
  legends: {
    visible: true,
    orient,
    item: {
      // symbolType takes a built-in name or an SVG path string; size is the marker's width and height.
      shape: { style: { symbolType: SHAPES[shape] ?? 'circle', size } },
    },
  },
});

const mount: Mount = (el, ctx) => {
  let shape = 'rect';
  let size = 12;
  let orient: 'left' | 'right' | 'top' | 'bottom' = 'right';
  const { vchart, release } = createChart(el, ctx, build(shape, size, orient));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(shape, size, orient));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'symbolType', NAMES, (v) => ((shape = v), apply())).value = shape in SHAPES ? shape : 'rect';
    slider(bar, 'size', [6, 28, 1], size, (v) => ((size = v), apply()));
    select(bar, 'orient', ['right', 'left', 'top', 'bottom'], (v) => ((orient = v as typeof orient), apply()));
  }
  let i = 0;
  const stop = every(1500, () => {
    i += 1;
    if (ctx.preview) {
      shape = pick(NAMES, i);
      apply();
    }
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
