// sankey node.align decides which column each node sits in
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const aligns = ['right', 'left', 'justify', 'center'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  const trace: Data = {
    type: 'sankey',
    orientation: 'h',
    node: { label: ['0', '1', '2', '3', '4', '5'], align: 'right' },
    link: { source: [0, 1, 4, 2, 1], target: [1, 4, 5, 4, 3], value: [4, 2, 3, 1, 2] },
  };

  await Plotly.newPlot(
    stage.div,
    [trace],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Align Nodes' }, font: { size: stage.preview ? 9 : 10 } },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'node.align', aligns, 'right', (a) => void restyle(stage.div, { 'node.align': a }));
  if (stage.preview) stage.every(1400, (i) => {
    const a = pick(aligns, i);
    void restyle(stage.div, { 'node.align': a });
  });

  return () => stage.dispose();
};

export default mount;
