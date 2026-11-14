// Changing col, row and colSpan of the legend and axis elements in a grid layout
import type { Mount } from '@/types.ts';
import { groupedRows } from '../../shared/components-data.ts';
import { select } from '../../shared/chart.ts';
import { mountReplay } from '../../shared/anim-data.ts';

interface State {
  legendRow: 0 | 2;
  span: 1 | 2;
  axisCol: 0 | 1;
}

const mount: Mount = (el, ctx) =>
  mountReplay<State>(el, ctx, {
    initial: { legendRow: 0, span: 2, axisCol: 0 },
    period: 2600,
    height: 360,
    init: { animation: false },
    build: ({ legendRow, span, axisCol }) => ({
      type: 'common',
      layout: {
        type: 'grid',
        col: 2,
        row: 3,
        elements: [
          { modelId: 'legend', col: 0, colSpan: span, row: legendRow },
          { modelId: 'region', col: axisCol === 0 ? 1 : 0, row: legendRow === 0 ? 1 : 0 },
          { modelId: 'axis-left', col: axisCol, row: legendRow === 0 ? 1 : 0 },
          { modelId: 'axis-bottom', col: axisCol === 0 ? 1 : 0, row: legendRow === 0 ? 2 : 1 },
        ],
      },
      region: [{ id: 'region' }],
      legends: { id: 'legend', visible: true, orient: 'top', regionId: ['region'] },
      series: [{ type: 'bar', regionId: 'region', data: { id: 'd', values: groupedRows(['A', 'B', 'C', 'D'], ['x', 'y'], 3) }, xField: ['x', 'c'], yField: 'y', seriesField: 'c' }],
      axes: [
        { id: 'axis-left', regionId: 'region', orient: 'left', type: 'linear' },
        { id: 'axis-bottom', regionId: 'region', orient: 'bottom', type: 'band' },
      ],
    }),
    step: (_s, i) => {
      const k = i % 4;
      return { legendRow: k < 2 ? 0 : 2, span: k % 2 ? 1 : 2, axisCol: k === 2 ? 1 : 0 };
    },
    controls: (bar, set) => {
      select(bar, 'legend row', ['top', 'bottom'], (v) => set({ legendRow: v === 'top' ? 0 : 2 }));
      select(bar, 'legend colSpan', ['2', '1'], (v) => set({ span: v === '2' ? 2 : 1 }));
      select(bar, 'left axis column', ['0', '1'], (v) => set({ axisCol: v === '0' ? 0 : 1 }));
    },
  });

export default mount;
