// Rectangles in date coordinates and paper height mark spans on a time axis
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const day = (d: number): string => `2015-02-${String(d).padStart(2, '0')}`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const days = Array.from({ length: 28 }, (_, i) => day(i + 1));
  const y = [-14, -17, -8, -4, -7, -10, -12, -14, -12, -7, -11, -7, -18, -14, -14, -16, -13, -7, -8, -14, -8, -3, -9, -9, -4, -13, -9, -6];
  const band = (a: number, b: number): Partial<Plotly.Shape> => ({
    type: 'rect',
    xref: 'x',
    yref: 'paper', // x in data, y across the whole plot [0, 1]
    x0: day(a),
    y0: 0,
    x1: day(b),
    y1: 1,
    fillcolor: '#9ca3af',
    opacity: 0.3,
    line: { width: 0 },
  });

  await Plotly.newPlot(
    stage.div,
    [{ x: days, y, mode: 'lines', name: 'temperature' }],
    { template: stage.template, shapes: [band(4, 6), band(20, 22)] },
    stage.config,
  );
  if (stage.bar) {
    slider(stage.bar, 'first band start (day)', [1, 14, 1], 4, (v) => void relayout(stage.div, { 'shapes[0].x0': day(v), 'shapes[0].x1': day(v + 2) }));
    select(stage.bar, 'shapes.layer', ['above', 'below'] as const, 'above', (v) => void relayout(stage.div, { 'shapes[0].layer': v, 'shapes[1].layer': v }));
  }
  if (stage.preview) stage.every(300, (i) => void relayout(stage.div, { 'shapes[0].x0': day(1 + (i % 22)), 'shapes[0].x1': day(3 + (i % 22)), 'shapes[1].x0': day(27 - (i % 22)), 'shapes[1].x1': day(28 - (i % 22)) }));
  return () => stage.dispose();
};

export default mount;
