// Discrete legend placement: orient, position and an optional title
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { groupedRows, pick } from '../../shared/components-data.ts';

const ORIENTS = ['top', 'right', 'bottom', 'left'] as const;
const POSITIONS = ['start', 'middle', 'end'] as const;

const build = (orient: string, position: string, title: boolean): ISpec => ({
  type: 'bar',
  data: [{ id: 'sales', values: groupedRows(['Q1', 'Q2', 'Q3', 'Q4'], ['North', 'South', 'East', 'West']) }],
  xField: ['x', 'c'],
  yField: 'y',
  seriesField: 'c',
  legends: {
    visible: true,
    orient: orient as (typeof ORIENTS)[number],
    position: position as (typeof POSITIONS)[number],
    title: { visible: title, text: 'Region' },
  },
});

const mount: Mount = (el, ctx) => {
  let orient: string = 'top';
  let position: string = 'middle';
  let title = true;
  const { vchart, release } = createChart(el, ctx, build(orient, position, title));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(orient, position, title));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // No controls in a card: step the legend around the chart.
    let i = 0;
    stop = every(2200, () => {
      i += 1;
      orient = pick(ORIENTS, i);
      position = pick(POSITIONS, i);
      apply();
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'orient', ORIENTS, (v) => ((orient = v), apply())).value = orient;
    select(bar, 'position', POSITIONS, (v) => ((position = v), apply())).value = position;
    select(bar, 'title', ['shown', 'hidden'], (v) => ((title = v === 'shown'), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
