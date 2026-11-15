// sankey node.sort and link.sort: 'input' keeps array order, 'auto' lets the layout choose
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const sorts = ['input', 'auto'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  const trace: Data = {
    type: 'sankey',
    node: { label: ['A', 'B', 'C', 'D', 'Z', 'Y', 'X', 'W'], pad: 15, thickness: 20, sort: 'input' },
    link: { source: [0, 1, 2, 3], target: [4, 5, 6, 7], value: [4, 3, 2, 1], sort: 'input' },
  };

  await Plotly.newPlot(
    stage.div,
    [trace],
    { template: stage.template, title: stage.preview ? undefined : { text: "Input Order Preserved (sort: 'input')" } },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'node.sort', sorts, 'input', (s) => void restyle(stage.div, { 'node.sort': s }));
    select(stage.bar, 'link.sort', sorts, 'input', (s) => void restyle(stage.div, { 'link.sort': s }));
  }
  if (stage.preview) stage.every(1600, (i) => {
    const s = pick(sorts, i);
    void restyle(stage.div, { 'node.sort': s, 'link.sort': s });
  });

  return () => stage.dispose();
};

export default mount;
