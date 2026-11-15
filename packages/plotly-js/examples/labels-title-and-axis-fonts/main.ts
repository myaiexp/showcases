// layout.title with font, x and xref, and styled axis titles
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const FAMILIES = ['Courier New, monospace', 'Georgia, serif', 'Arial, sans-serif', 'Impact, fantasy'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const axisFont = { family: 'Courier New, monospace', size: stage.preview ? 10 : 18, color: '#a6acb8' };

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: x, name: 'Name of Trace 1', type: 'scatter' },
      { x, y: [1, 0, 3, 2, 5, 4, 7, 6, 8], name: 'Name of Trace 2', type: 'scatter' },
    ],
    {
      template: stage.template,
      title: { text: 'Plot Title', font: { family: 'Courier New, monospace', size: stage.preview ? 14 : 24 }, xref: 'paper', x: 0.05 },
      xaxis: { title: { text: 'x Axis', font: axisFont } },
      yaxis: { title: { text: 'y Axis', font: axisFont } },
      margin: stage.preview ? { t: 30, l: 40, b: 36 } : undefined,
    },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'title.font.family', FAMILIES, FAMILIES[0], (v) => void relayout(stage.div, { 'title.font.family': v }));
    slider(stage.bar, 'title.font.size', [10, 48, 1], 24, (v) => void relayout(stage.div, { 'title.font.size': v }));
    slider(stage.bar, 'title.x', [0, 1, 0.05], 0.05, (v) => void relayout(stage.div, { 'title.x': v }));
  }
  if (stage.preview) stage.every(1200, (i) => void relayout(stage.div, { 'title.x': [0.05, 0.5, 0.95][i % 3], 'title.font.family': FAMILIES[i % FAMILIES.length] }));
  return () => stage.dispose();
};

export default mount;
