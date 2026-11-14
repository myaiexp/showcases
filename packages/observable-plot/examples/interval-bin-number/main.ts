// binX with a number as interval: bins at consecutive multiples of n
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const STEPS = ['2', '5', '10', '20', '40'];

const mount: Mount = async (el, ctx) => {
  const athletes = await csv('athletes.csv');
  const data = ctx.preview ? thin(athletes, 4) : athletes;
  return mountPlot<{ step: string }>(el, ctx, {
    initial: { step: '5' },
    render: ({ step }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `interval: ${step}` : undefined,
        y: { grid: true },
        marks: [
          Plot.rectY(data, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', interval: Number(step), fill: 'steelblue' })),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ step: STEPS[i % STEPS.length] }),
    previewMs: 1700,
    controls: (bar, live) => {
      select(bar, 'weight interval (kg)', STEPS, live.state.step, (step) => live.set({ step }));
    },
  });
};

export default mount;
