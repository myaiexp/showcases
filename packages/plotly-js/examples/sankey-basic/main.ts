// the minimal sankey: node labels and source/target/value link arrays; orientation h or v
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  const trace: Data = {
    type: 'sankey',
    orientation: 'h',
    node: {
      pad: 15,
      thickness: 30,
      line: { color: 'black', width: 0.5 },
      label: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      color: ['blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
    },
    link: { source: [0, 1, 0, 2, 3, 3], target: [2, 3, 3, 4, 4, 5], value: [8, 4, 2, 8, 4, 2] },
  };

  await Plotly.newPlot(
    stage.div,
    [trace],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Basic Sankey' }, font: { size: stage.preview ? 9 : 10 } },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'orientation', ['h', 'v'], 'h', (o) => void restyle(stage.div, { orientation: o }));
    slider(stage.bar, 'node.thickness', [5, 60, 1], 30, (v) => void restyle(stage.div, { 'node.thickness': v }));
    slider(stage.bar, 'node.pad', [2, 60, 1], 15, (v) => void restyle(stage.div, { 'node.pad': v }));
  }
  if (stage.preview) stage.every(1500, (i) => void restyle(stage.div, { 'node.thickness': pick([30, 12, 46, 20], i), 'node.pad': pick([15, 30, 8, 22], i) }));

  return () => stage.dispose();
};

export default mount;
