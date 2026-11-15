// treemap from labels and parents only; trace.level re-roots the view
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const levels = ['', 'Eve', 'Seth', 'Awan'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  const data: Data[] = [{
    type: 'treemap',
    labels: ['Eve', 'Cain', 'Seth', 'Enos', 'Noam', 'Abel', 'Awan', 'Enoch', 'Azura'],
    parents: ['', 'Eve', 'Eve', 'Seth', 'Seth', 'Eve', 'Eve', 'Awan', 'Eve'],
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: stage.preview ? { l: 4, r: 4, t: 4, b: 4 } : { l: 10, r: 10, t: 30, b: 10 } }, stage.config);

  if (stage.bar) select(stage.bar, 'level', levels.map((l) => l || '(root)'), '(root)', (l) => void restyle(stage.div, { level: l === '(root)' ? '' : l }));
  if (stage.preview) stage.every(1500, (i) => void restyle(stage.div, { level: pick(levels, i) }));

  return () => stage.dispose();
};

export default mount;
