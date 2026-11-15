// A Cartesian scatter, a polar chart and a pie sharing one figure, each in its own domain
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const theta = Array.from({ length: 13 }, (_, i) => i * 30);
  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter', mode: 'lines+markers', x: [1, 2, 3, 4, 5], y: [3, 1, 4, 2, 5], name: 'xy', xaxis: 'x', yaxis: 'y' },
      { type: 'scatterpolar', mode: 'lines', r: theta.map((t) => 2 + Math.sin((t * Math.PI) / 90)), theta, fill: 'toself', name: 'polar', subplot: 'polar' },
      { type: 'pie', values: [40, 25, 20, 15], labels: ['A', 'B', 'C', 'D'], domain: { x: [0.68, 1], y: [0.2, 0.8] }, hole: 0.4, textinfo: stage.preview ? 'none' : 'label', name: 'pie' },
    ],
    {
      template: stage.template,
      showlegend: false,
      xaxis: { domain: [0, 0.3] },
      yaxis: { domain: [0.1, 0.9] },
      polar: { domain: { x: [0.36, 0.64], y: [0.1, 0.9] }, bgcolor: 'rgba(0,0,0,0)', radialaxis: { showticklabels: !stage.preview } },
    },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'polar.angularaxis.rotation', [0, 360, 5], 0, (v) => void relayout(stage.div, { 'polar.angularaxis.rotation': v }));
    slider(stage.bar, 'pie hole', [0, 0.8, 0.05], 0.4, (v) => void restyle(stage.div, { hole: v }, [2]));
  } else {
    stage.every(100, (i) => {
      void relayout(stage.div, { 'polar.angularaxis.rotation': (i * 6) % 360 });
      void restyle(stage.div, { rotation: (i * 4) % 360 }, [2]);
    });
  }
  return () => stage.dispose();
};

export default mount;
