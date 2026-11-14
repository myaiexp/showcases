// Progressive rendering on a box plot, a few boxes at a time
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountProgressive } from '../../shared/progressive-data.ts';

interface State {
  groups: number;
  step: number;
}

function rows(n: number): Record<string, unknown>[] {
  return Array.from({ length: n }, (_, i) => ({
    x: `group${i + 1}`,
    y1: 1600 - (i % 4) * 80,
    y2: 1200,
    y3: 800 + (i % 3) * 40,
    y4: 700,
    y5: 500,
    outliers: [2000, 2200],
  }));
}

const mount: Mount = (el, ctx) =>
  mountProgressive<State>(el, ctx, {
    initial: { groups: ctx.preview ? 12 : 30, step: 2 },
    chartHeight: 460,
    build: (s, preview) =>
      ({
        type: 'boxPlot',
        data: [{ id: 'boxes', values: rows(s.groups) }],
        xField: 'x',
        minField: 'y5',
        q1Field: 'y4',
        medianField: 'y3',
        q3Field: 'y2',
        maxField: 'y1',
        outliersField: 'outliers',
        outliersStyle: { fill: '#FE6244', size: preview ? 4 : 8 },
        // A very small slice and a threshold of 10 make the progressive drawing easy to see.
        progressiveStep: s.step,
        progressiveThreshold: 10,
        boxPlot: { style: { shaftFillOpacity: 0.5, strokeWidth: 2, boxFillColor: '#9E4784', strokeColor: '#62CDFF' } },
        axes: [
          { orient: 'bottom', type: 'band', label: { visible: !preview } },
          { orient: 'left', type: 'linear' },
        ],
      }) as never,
    controls(bar, state, set) {
      slider(bar, 'groups', [11, 80, 1], state.groups, (groups) => set({ groups }));
      slider(bar, 'progressiveStep', [1, 20, 1], state.step, (step) => set({ step }));
    },
    step: (_, i) => ({ step: i % 2 ? 1 : 3 }),
    previewMs: 2400,
  });

export default mount;
