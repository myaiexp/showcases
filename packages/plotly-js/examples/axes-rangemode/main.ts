// rangemode: normal, tozero and nonnegative under autorange
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['normal', 'tozero', 'nonnegative'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [2, 4, 6], y: [-3, 0, 3], type: 'scatter', marker: { size: 10 } }],
    { template: stage.template, showlegend: false, xaxis: { rangemode: 'tozero', autorange: true }, yaxis: { rangemode: 'nonnegative', autorange: true } },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'xaxis.rangemode', MODES, 'tozero', (v) => void relayout(stage.div, { 'xaxis.rangemode': v }));
    select(stage.bar, 'yaxis.rangemode', MODES, 'nonnegative', (v) => void relayout(stage.div, { 'yaxis.rangemode': v }));
  }
  if (stage.preview) {
    stage.every(1300, (i) => void relayout(stage.div, { 'xaxis.rangemode': MODES[i % 3], 'yaxis.rangemode': MODES[(i + 1) % 3] }));
  }
  return () => stage.dispose();
};

export default mount;
