// xaxis.type and yaxis.type: linear against log with autorange
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES = ['linear', 'log'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [8, 7, 6, 5, 4, 3, 2, 1, 0], type: 'scatter' },
      { x, y: x, type: 'scatter' },
    ],
    { template: stage.template, xaxis: { type: 'log', autorange: true }, yaxis: { type: 'log', autorange: true } },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'xaxis.type', TYPES, 'log', (v) => void relayout(stage.div, { 'xaxis.type': v }));
    select(stage.bar, 'yaxis.type', TYPES, 'log', (v) => void relayout(stage.div, { 'yaxis.type': v }));
  }
  if (stage.preview) stage.every(1500, (i) => void relayout(stage.div, { 'xaxis.type': TYPES[i % 2], 'yaxis.type': TYPES[(i >> 1) % 2] }));
  return () => stage.dispose();
};

export default mount;
