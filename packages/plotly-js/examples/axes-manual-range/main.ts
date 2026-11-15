// xaxis.range and yaxis.range set by hand, turning autorange off
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const range = { lo: 2, hi: 5 };

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [8, 7, 6, 5, 4, 3, 2, 1, 0], type: 'scatter' },
      { x, y: x, type: 'scatter' },
    ],
    { template: stage.template, xaxis: { range: [range.lo, range.hi] }, yaxis: { range: [range.lo, range.hi] } },
    stage.config,
  );

  const apply = (): Promise<void> => relayout(stage.div, { 'xaxis.range': [range.lo, range.hi], 'yaxis.range': [range.lo, range.hi] });
  if (stage.bar) {
    slider(stage.bar, 'range start', [-2, 6, 0.5], 2, (v) => {
      range.lo = Math.min(v, range.hi - 0.5);
      void apply();
    });
    slider(stage.bar, 'range end', [1, 10, 0.5], 5, (v) => {
      range.hi = Math.max(v, range.lo + 0.5);
      void apply();
    });
    button(stage.bar, 'autorange', () => void relayout(stage.div, { 'xaxis.autorange': true, 'yaxis.autorange': true }));
  }
  if (stage.preview) {
    stage.every(120, (i) => {
      const t = i / 14;
      range.lo = 2 + Math.sin(t) * 2;
      range.hi = range.lo + 3 + Math.sin(t * 0.7) * 1.2;
      void apply();
    });
  }
  return () => stage.dispose();
};

export default mount;
