// trace.textfont: family, size and colour of text on a scatter trace
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const FAMILIES = ['sans serif', 'Courier New, monospace', 'Georgia, serif', 'Impact, fantasy'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [0, 1, 2], y: [1, 1, 1], mode: 'lines+markers+text', name: 'Lines, Markers and Text', text: ['Text A', 'Text B', 'Text C'], textposition: 'top right', textfont: { family: 'sans serif', size: 18, color: '#60a5fa' }, type: 'scatter' },
      { x: [0, 1, 2], y: [2, 2, 2], mode: 'lines+markers+text', name: 'Lines and Text', text: ['Text G', 'Text H', 'Text I'], textposition: 'bottom center', textfont: { family: 'sans serif', size: 18, color: '#f59e0b' }, type: 'scatter' },
    ],
    { template: stage.template, showlegend: false, xaxis: { range: [-0.5, 2.8] }, yaxis: { range: [0, 3] } },
    stage.config,
  );
  if (stage.bar) {
    slider(stage.bar, 'textfont.size', [8, 40, 1], 18, (v) => void restyle(stage.div, { 'textfont.size': v }));
    select(stage.bar, 'textfont.family', FAMILIES, FAMILIES[0], (v) => void restyle(stage.div, { 'textfont.family': v }));
  }
  if (stage.preview) stage.every(1100, (i) => void restyle(stage.div, { 'textfont.size': 10 + (i % 4) * 5, 'textfont.family': pick(FAMILIES, i) }));
  return () => stage.dispose();
};

export default mount;
