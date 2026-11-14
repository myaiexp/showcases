// Why Plot? transforms: count penguins by species, then add fy, then add fill
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const STEPS = ['groupY count', '+ fy: island', '+ fill: sex'] as const;
type Step = (typeof STEPS)[number];

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ stage: Step }>(el, ctx, {
    initial: { stage: 'groupY count' },
    render: ({ stage }, { width, height, preview }) => {
      // Each stage adds one channel to the same groupY options.
      const options =
        stage === 'groupY count'
          ? { y: 'species' }
          : stage === '+ fy: island'
            ? { fy: 'island', y: 'species' }
            : { fy: 'island', y: 'species', fill: 'sex' };
      return Plot.plot({
        width,
        height,
        marginLeft: 80,
        marginRight: 80,
        color: { legend: stage === '+ fill: sex' && !preview },
        marks: [Plot.barX(penguins, Plot.groupY({ x: 'count' }, options)), Plot.ruleX([0])],
      });
    },
    step: ({ stage }) => ({ stage: STEPS[(STEPS.indexOf(stage) + 1) % STEPS.length] }),
    previewMs: 2600,
    controls: (bar, live) => {
      select(bar, 'stage', STEPS, live.state.stage, (stage) => live.set({ stage }));
    },
  });
};

export default mount;
