// xaxis.type 'date' against linear and category for ISO date strings
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES = ['date', 'category', 'linear'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = Array.from({ length: 31 }, (_, i) => `2000-01-${String(i + 1).padStart(2, '0')}`);
  const y = [4.3, 8.2, 4.1, 5.6, -3, -0.2, 0.3, 0.4, 4.1, 5, 4.6, -0.2, -8.5, -9.1, -2.7, -2.7, -17, -11.3, -5.5, -6.5, -16.9, -12, -6.1, -6.6, -7.9, -10.8, -14.8, -11, -4.4, -1.3, -1.1];

  await Plotly.newPlot(
    stage.div,
    [{ x, y, mode: 'lines', type: 'scatter', name: '2000' }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : '2000 Toronto January Weather' },
      xaxis: { type: 'date', title: { text: stage.preview ? '' : 'January Weather' } },
      yaxis: { title: { text: stage.preview ? '' : 'Daily Mean Temperature' } },
    },
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'xaxis.type', TYPES, 'date', (v) => void relayout(stage.div, { 'xaxis.type': v }));
  if (stage.preview) stage.every(1500, (i) => void relayout(stage.div, { 'xaxis.type': TYPES[i % 3] }));
  return () => stage.dispose();
};

export default mount;
