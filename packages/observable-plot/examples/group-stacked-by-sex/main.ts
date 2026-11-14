// A fill channel splits groups: barY stacks counts by sex, or stackY
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot<{ explicit: boolean }>(el, ctx, {
    initial: { explicit: false },
    render: ({ explicit }, { width, height, preview }) => {
      const options = { x: 'sport', fill: 'sex' };
      return Plot.plot({
        width,
        height,
        marginBottom: preview ? 10 : 100,
        x: { label: null, tickRotate: 90, axis: preview ? null : 'bottom' },
        y: { grid: true },
        color: { legend: !preview },
        // The explicit stackY gives the identical chart as barY's implicit stack.
        marks: [Plot.barY(olympians, explicit ? Plot.stackY(Plot.groupX({ y: 'count' }, options)) : Plot.groupX({ y: 'count' }, options)), Plot.ruleY([0])],
      });
    },
    step: ({ explicit }) => ({ explicit: !explicit }),
    controls: (bar, live) => toggle(bar, 'explicit stackY', live.state.explicit, (explicit) => live.set({ explicit })),
  });
};

export default mount;
