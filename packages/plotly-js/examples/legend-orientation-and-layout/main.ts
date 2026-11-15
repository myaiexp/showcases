// legend.orientation with entrywidth, valign and itemsizing
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [0, 3, 6, 4, 5, 2, 3, 5, 4], name: 'North', type: 'scatter' },
      { x, y: [0, 4, 7, 8, 3, 6, 3, 3, 4], name: 'South', type: 'scatter' },
      { x, y: [1, 2, 3, 4, 3, 4, 5, 6, 5], name: 'East side', type: 'scatter' },
      { x, y: [5, 5, 4, 3, 4, 3, 2, 1, 2], name: 'West side', type: 'scatter' },
    ],
    { template: stage.template, showlegend: true, legend: { orientation: 'h', y: -0.15, entrywidth: 0 } } as Partial<Layout>,
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'legend.orientation', ['h', 'v'] as const, 'h', (v) => void relayout(stage.div, v === 'h' ? { 'legend.orientation': v, 'legend.y': -0.15, 'legend.x': 0 } : { 'legend.orientation': v, 'legend.y': 1, 'legend.x': 1.02 }));
    slider(stage.bar, 'legend.entrywidth', [0, 200, 10], 0, (v) => void relayout(stage.div, { 'legend.entrywidth': v }));
    select(stage.bar, 'legend.valign', ['middle', 'top', 'bottom'] as const, 'middle', (v) => void relayout(stage.div, { 'legend.valign': v }));
  }
  if (stage.preview) {
    stage.every(1400, (i) => void relayout(stage.div, i % 2 ? { 'legend.orientation': 'v', 'legend.y': 1, 'legend.x': 1.02 } : { 'legend.orientation': 'h', 'legend.y': -0.25, 'legend.x': 0 }));
  }
  return () => stage.dispose();
};

export default mount;
