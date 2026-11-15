// two treemap traces in side-by-side domains: branchvalues remainder vs total, with textinfo
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const infos = ['label+value+percent parent+percent entry', 'label', 'label+value', 'label+percent parent', 'label+percent entry'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const labels = ['Eve', 'Cain', 'Seth', 'Enos', 'Noam', 'Abel', 'Awan', 'Enoch', 'Azura'];
  const parents = ['', 'Eve', 'Eve', 'Seth', 'Seth', 'Eve', 'Eve', 'Awan', 'Eve'];

  const data: Data[] = [
    {
      type: 'treemap', labels, parents, values: [10, 14, 12, 10, 2, 6, 6, 1, 4], textinfo: infos[0], domain: { x: [0, 0.48] },
      outsidetextfont: { size: 20, color: '#377eb8' }, marker: { line: { width: 2 } }, pathbar: { visible: false },
    },
    {
      type: 'treemap', branchvalues: 'total', labels, parents, domain: { x: [0.52, 1] }, values: [65, 14, 12, 10, 2, 6, 6, 1, 4], textinfo: infos[0],
      outsidetextfont: { size: 20, color: '#377eb8' }, marker: { line: { width: 2 } }, pathbar: { visible: false },
    },
  ];

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      margin: stage.preview ? { l: 4, r: 4, t: 22, b: 4 } : { l: 10, r: 10, t: 60, b: 10 },
      annotations: [
        { showarrow: false, text: 'branchvalues: <b>remainder</b>', x: 0.25, xanchor: 'center', y: 1.1, yanchor: 'bottom', xref: 'paper', yref: 'paper', font: { size: stage.preview ? 9 : 13 } },
        { showarrow: false, text: 'branchvalues: <b>total</b>', x: 0.75, xanchor: 'center', y: 1.1, yanchor: 'bottom', xref: 'paper', yref: 'paper', font: { size: stage.preview ? 9 : 13 } },
      ],
    },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'textinfo', infos, infos[0] as string, (t) => void restyle(stage.div, { textinfo: t }));
  if (stage.preview) stage.every(1500, (i) => void restyle(stage.div, { textinfo: pick(infos, i) }));

  return () => stage.dispose();
};

export default mount;
