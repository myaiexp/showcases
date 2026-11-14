// Tooltip maxLineCount: only the first rows are listed, the rest fold into othersLine
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider } from '../../shared/chart.ts';
import { dimensionTour, groupedRows } from '../../shared/components-data.ts';

const CATS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const GROUPS = ['Ash', 'Birch', 'Cedar', 'Dogwood', 'Elm', 'Fir', 'Gum', 'Hazel'];

const build = (max: number) => ({
  type: 'line' as const,
  data: [{ id: 'd', values: groupedRows(CATS, GROUPS, 8) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  legends: { visible: false },
  tooltip: {
    dimension: {
      maxLineCount: max,
      othersLine: { key: 'others', value: 'more rows hidden', visible: true, shapeType: 'square', shapeFill: '#8a8f9c' },
    },
  },
});

const mount: Mount = (el, ctx) => {
  let max = 4;
  const { vchart, release } = createChart(el, ctx, build(max));
  let released = false;
  let stop = (): void => {};
  if (ctx.preview) stop = dimensionTour(vchart, CATS, 1200);
  else {
    const bar = controlBar(el);
    el.prepend(bar);
    slider(bar, 'maxLineCount', [1, 8, 1], max, (v) => {
      max = v;
      if (!released) void vchart.updateSpec(build(max));
    });
  }
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
