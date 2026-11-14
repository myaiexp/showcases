// Stacked areas of Crimean War deaths, implicit areaY or an explicit stackY
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { crimea } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const data = await crimea();
  return mountPlot<{ explicit: boolean }>(el, ctx, {
    initial: { explicit: false },
    render: ({ explicit }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        color: { legend: !preview },
        marks: [
          explicit
            ? Plot.areaY(data, Plot.stackY({ x: 'date', y: 'deaths', fill: 'cause' }))
            : Plot.areaY(data, { x: 'date', y: 'deaths', fill: 'cause' }),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ explicit }) => ({ explicit: !explicit }),
    previewMs: 3000,
    controls: (bar, live) => {
      toggle(bar, 'explicit Plot.stackY', live.state.explicit, (explicit) => live.set({ explicit }));
    },
  });
};

export default mount;
