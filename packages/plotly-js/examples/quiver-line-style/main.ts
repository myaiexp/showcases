// Two quiver traces, a dotted modelled field under a solid measured one: line width, dash and head size
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const x: number[] = [];
  const y: number[] = [];
  const uModel: number[] = [];
  const vModel: number[] = [];
  const uMeas: number[] = [];
  const vMeas: number[] = [];
  for (let i = 0; i <= 5; i += 1) {
    for (let j = 0; j <= 5; j += 1) {
      x.push(i);
      y.push(j);
      uModel.push(1);
      vModel.push(0.15 * (j - 2.5));
      uMeas.push(0.9);
      vMeas.push(0.15 * (j - 2.5) + 0.25 * Math.cos(i));
    }
  }

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'quiver', name: 'model', x, y, u: uModel, v: vModel, marker: { color: '#9ca3af', arrowsize: 0.8, line: { width: 2, dash: 'dot' } } },
      { type: 'quiver', name: 'measured', x, y, u: uMeas, v: vMeas, marker: { color: '#ef4444', arrowsize: 1.2, line: { width: 3 } } },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Modelled and measured fields' }, showlegend: !stage.preview, xaxis: { title: { text: 'x' } }, yaxis: { title: { text: 'y' } } },
    stage.config,
  );

  const dashes = ['dot', 'dash', 'solid', 'dashdot'] as const;
  if (stage.bar) {
    select(stage.bar, 'model marker.line.dash', dashes, 'dot', (d) => void restyle(stage.div, { 'marker.line.dash': d }, [0]));
    slider(stage.bar, 'measured marker.line.width', [1, 8, 0.5], 3, (w) => void restyle(stage.div, { 'marker.line.width': w }, [1]));
    slider(stage.bar, 'measured marker.arrowsize', [0.3, 3, 0.1], 1.2, (s) => void restyle(stage.div, { 'marker.arrowsize': s }, [1]));
  } else {
    stage.every(130, (i) => void restyle(stage.div, { 'marker.arrowsize': 0.8 + 0.7 * (1 + Math.sin(i / 6)), 'marker.line.width': 2 + 1.5 * (1 + Math.cos(i / 6)) }, [1]));
  }

  return () => stage.dispose();
};

export default mount;
