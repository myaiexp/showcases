// line shapes as tangents: horizontal segments where the curve peaks and dips
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const f = (x: number): number => x * Math.sin(x * x) + 1;
const df = (x: number): number => Math.sin(x * x) + 2 * x * x * Math.cos(x * x);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const xs = Array.from({ length: 200 }, (_, i) => 1 + (i * 2) / 199);
  const seg = (a: number, b: number, y: number): Partial<Plotly.Shape> => ({ type: 'line', x0: a, y0: y, x1: b, y1: y, opacity: 0.7, line: { color: '#f87171', width: 2.5 } });
  // The slanted one follows the slope at x: a short segment through (x, f(x)).
  const tangent = (x: number): Partial<Plotly.Shape> => ({ type: 'line', x0: x - 0.12, y0: f(x) - df(x) * 0.12, x1: x + 0.12, y1: f(x) + df(x) * 0.12, line: { color: '#fbbf24', width: 3 } });

  await Plotly.newPlot(
    stage.div,
    [{ x: xs, y: xs.map(f), type: 'scatter' }],
    { template: stage.template, showlegend: false, shapes: [seg(1, 1.75, 2.30756), seg(2.5, 3.05, 3.80796), seg(1.9, 2.5, -1.1827), tangent(1.5)] },
    stage.config,
  );
  const move = (x: number): Promise<void> => relayout(stage.div, { 'shapes[3]': tangent(x) });
  if (stage.bar) slider(stage.bar, 'slanted tangent at x', [1.05, 2.95, 0.01], 1.5, (v) => void move(v));
  if (stage.preview) stage.every(100, (i) => void move(2 + Math.sin(i / 12) * 0.9));
  return () => stage.dispose();
};

export default mount;
