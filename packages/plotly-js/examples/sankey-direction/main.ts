// sankey direction: forward or reversed along the orientation axis
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const dirs = ['reversed', 'forward'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  const trace: Data = {
    type: 'sankey',
    orientation: 'h',
    direction: 'reversed',
    node: { label: ['Coal', 'Gas', 'Solar', 'Grid', 'Residential', 'Industrial'], pad: 15, thickness: 20 },
    link: { source: [0, 1, 2, 3, 3], target: [3, 3, 3, 4, 5], value: [8, 4, 3, 9, 6] },
  };

  await Plotly.newPlot(
    stage.div,
    [trace],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Reversed Flow (sources on the right)' } },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'direction', dirs, 'reversed', (d) => void restyle(stage.div, { direction: d }));
  if (stage.bar) select(stage.bar, 'orientation', ['h', 'v'], 'h', (o) => void restyle(stage.div, { orientation: o }));
  if (stage.preview) stage.every(1500, (i) => {
    const d = pick(dirs, i);
    void restyle(stage.div, { direction: d });
  });

  return () => stage.dispose();
};

export default mount;
