// title.automargin and title.yref: whether a big title makes room for itself
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const years = [1952, 1957, 1962, 1967, 1972, 1977, 1982, 1987, 1992, 1997, 2002, 2007];

  await Plotly.newPlot(
    stage.div,
    [
      { x: years, y: [69.39, 70.26, 71.24, 71.52, 71.89, 72.22, 73.84, 74.32, 76.33, 77.55, 79.11, 80.204], type: 'scatter' },
      { x: years, y: [69.12, 70.33, 70.93, 71.1, 71.93, 73.49, 74.74, 76.32, 77.56, 78.83, 80.37, 81.235], type: 'scatter' },
    ],
    {
      template: stage.template,
      title: { text: 'Population', font: { family: 'Courier New, monospace', size: stage.preview ? 30 : 70 }, yref: 'paper', automargin: true },
      showlegend: false,
    } as Partial<Layout>,
    stage.config,
  );
  if (stage.bar) {
    toggle(stage.bar, 'title.automargin', true, (v) => void relayout(stage.div, { 'title.automargin': v }));
    select(stage.bar, 'title.yref', ['paper', 'container'] as const, 'paper', (v) => void relayout(stage.div, { 'title.yref': v }));
    slider(stage.bar, 'title.font.size', [20, 100, 5], 70, (v) => void relayout(stage.div, { 'title.font.size': v }));
  }
  if (stage.preview) stage.every(1500, (i) => void relayout(stage.div, { 'title.automargin': i % 4 < 2, 'title.yref': i % 2 ? 'container' : 'paper' }));
  return () => stage.dispose();
};

export default mount;
