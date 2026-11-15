// sunburst branchvalues: 'remainder' (default) vs 'total'
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

// With 'total' a parent's value must be at least the sum of its children's (Eve: 65 = 14+12+6+6+4 + 23 own).
const values = {
  remainder: [10, 14, 12, 10, 2, 6, 6, 4, 4],
  total: [65, 14, 12, 10, 2, 6, 6, 4, 4],
} as const;
const modes = ['total', 'remainder'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });

  const data: Data[] = [{
    type: 'sunburst',
    labels: ['Eve', 'Cain', 'Seth', 'Enos', 'Noam', 'Abel', 'Awan', 'Enoch', 'Azura'],
    parents: ['', 'Eve', 'Eve', 'Seth', 'Seth', 'Eve', 'Eve', 'Awan', 'Eve'],
    values: [...values.total],
    leaf: { opacity: 0.4 },
    marker: { line: { width: 2 } },
    branchvalues: 'total',
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: { l: 0, r: 0, b: 0, t: 0 } }, stage.config);

  const apply = (m: (typeof modes)[number]): void => void restyle(stage.div, { branchvalues: m, values: [[...values[m]]] });
  if (stage.bar) select(stage.bar, 'branchvalues', modes, 'total', apply);
  if (stage.preview) stage.every(1800, (i) => {
    const m = pick(modes, i);
    apply(m);
  });

  return () => stage.dispose();
};

export default mount;
