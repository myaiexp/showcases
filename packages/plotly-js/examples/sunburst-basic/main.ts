// sunburst from labels, parents, values; leaf.opacity and marker.line
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });

  const data: Data[] = [{
    type: 'sunburst',
    labels: ['Eve', 'Cain', 'Seth', 'Enos', 'Noam', 'Abel', 'Awan', 'Enoch', 'Azura'],
    parents: ['', 'Eve', 'Eve', 'Seth', 'Seth', 'Eve', 'Eve', 'Awan', 'Eve'],
    values: [10, 14, 12, 10, 2, 6, 6, 4, 4],
    outsidetextfont: { size: 20, color: '#377eb8' },
    leaf: { opacity: 0.4 },
    marker: { line: { width: 2 } },
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: { l: 0, r: 0, b: 0, t: 0 } }, stage.config);

  if (stage.bar) {
    slider(stage.bar, 'leaf.opacity', [0, 1, 0.05], 0.4, (o) => void restyle(stage.div, { 'leaf.opacity': o }));
    slider(stage.bar, 'marker.line.width', [0, 8, 0.5], 2, (w) => void restyle(stage.div, { 'marker.line.width': w }));
    slider(stage.bar, 'rotation', [0, 360, 1], 0, (r) => void restyle(stage.div, { rotation: r }));
  }
  if (stage.preview) stage.every(60, (i) => void restyle(stage.div, { rotation: (i * 3) % 360 }));

  return () => stage.dispose();
};

export default mount;
