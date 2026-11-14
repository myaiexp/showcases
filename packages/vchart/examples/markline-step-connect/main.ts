// markLine type 'type-step': a stepped connector between two data points, with end symbols
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { groupedRows, pick } from '../../shared/components-data.ts';

const CATS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const rows = groupedRows(CATS, ['Sales'], 15);
const DIRECTIONS = ['top', 'bottom', 'left', 'right'] as const;
type Direction = (typeof DIRECTIONS)[number];

const build = (direction: Direction, expand: number): ISpec => ({
  type: 'line',
  data: [{ id: 'trend', values: rows }],
  xField: 'x',
  yField: 'y',
  axes: [{ orient: 'left', max: 100 }, { orient: 'bottom' }],
  point: { style: { size: 8 } },
  markLine: [
    {
      // Two data points; the step line leaves the first in connectDirection and comes back to the second.
      type: 'type-step',
      connectDirection: direction,
      expandDistance: expand,
      coordinates: [
        { x: 'Feb', y: rows[1]?.y ?? 0 },
        { x: 'May', y: rows[4]?.y ?? 0 },
      ],
      line: { style: { stroke: '#f472b6', lineWidth: 2 } },
      label: { position: 'middle', text: 'Feb to May', style: { fill: '#f472b6', fontWeight: 'bold' }, labelBackground: { visible: true, style: { fill: 'rgba(244,114,182,0.15)' } } },
      startSymbol: { visible: true, symbolType: 'circle', size: 8, style: { fill: '#f472b6' } },
      endSymbol: { visible: true, symbolType: 'triangle', size: 10, style: { fill: '#f472b6' } },
    },
  ],
});

const mount: Mount = (el, ctx) => {
  let direction: Direction = 'top';
  let expand = 40;
  const { vchart, release } = createChart(el, ctx, build(direction, expand));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(direction, expand));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => {
      i += 1;
      direction = pick(DIRECTIONS, i);
      // The card is narrow: a left or right connector with a long expandDistance leaves the plot.
      expand = 12 + (i % 3) * 8;
      apply();
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'connectDirection', DIRECTIONS, (v) => ((direction = v as Direction), apply()));
    slider(bar, 'expandDistance', [0, 120, 5], expand, (v) => ((expand = v), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
