// Progressive rendering of grouped areas with many points
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { groupedSeries, mountProgressive } from '../../shared/progressive-data.ts';

interface State {
  points: number;
  step: number;
}

const mount: Mount = (el, ctx) =>
  mountProgressive<State>(el, ctx, {
    initial: { points: ctx.preview ? 1500 : 10000, step: 100 },
    build: (s) =>
      ({
        type: 'common',
        data: [{ id: 'groups', values: groupedSeries(s.points, ['A', 'B'], 3) }],
        series: [
          {
            type: 'area',
            dataIndex: 0,
            xField: 'x',
            yField: 'y',
            seriesField: 'type',
            progressiveStep: s.step,
            progressiveThreshold: 1000,
            largeThreshold: 500,
            point: { visible: false },
            area: { style: { fillOpacity: 0.3 } },
          },
        ],
        axes: [
          { orient: 'bottom', type: 'band', label: { visible: false } },
          { orient: 'left', type: 'linear', range: { min: 0 } },
        ],
        tooltip: { visible: false },
        animation: false,
      }) as never,
    controls(bar, state, set) {
      slider(bar, 'points per group', [1000, 30000, 1000], state.points, (points) => set({ points }));
      slider(bar, 'progressiveStep', [50, 2000, 50], state.step, (step) => set({ step }));
    },
    step: (_, i) => ({ step: [100, 500, 50][i % 3] ?? 100 }),
  });

export default mount;
