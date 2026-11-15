// A point travelling along a curve in carpet coordinates, leaving a trail, over a stretched grid
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { linspace } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

// The path in (a, b): a spiral in parameter space, which the carpet bends into the plot.
const path = linspace(0, 1, 120).map((t) => ({ a: 0.5 + 0.38 * t * Math.cos(t * 9), b: 2 + 1.6 * t * Math.sin(t * 9) }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const ys: number[][] = [];
  for (let j = 0; j < 9; j += 1) ys.push(linspace(0, 1, 9).map((i) => 1 + j * 0.5 + i * 2 + 0.3 * Math.sin(i * 4 + j)));

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'carpet',
        a: linspace(0, 1, 9),
        b: linspace(0, 4, 9),
        y: ys,
        cheaterslope: 0.6,
        aaxis: { smoothing: 1, minorgridcount: 4, tickmode: 'linear', dtick: 0.25 },
        baxis: { smoothing: 1, minorgridcount: 4, tickmode: 'linear', dtick: 1 },
      },
      { type: 'scattercarpet', name: 'trail', mode: 'lines', a: [path[0]?.a ?? 0], b: [path[0]?.b ?? 0], line: { color: '#f59e0b', width: 2 } },
      { type: 'scattercarpet', name: 'point', mode: 'markers', a: [path[0]?.a ?? 0], b: [path[0]?.b ?? 0], marker: { size: 12, color: '#f472b6' } },
    ],
    { template: stage.template, showlegend: false },
    stage.config,
  );

  // Both traces take new a and b values: the carpet maps them to x and y each time.
  const at = (n: number): void => {
    const k = Math.max(1, Math.min(path.length, Math.round(n)));
    const seen = path.slice(0, k);
    const last = seen[k - 1];
    void restyle(stage.div, { a: [seen.map((p) => p.a), [last?.a ?? 0]], b: [seen.map((p) => p.b), [last?.b ?? 0]] }, [1, 2]);
  };
  if (stage.bar) slider(stage.bar, 'position along the path', [1, path.length, 1], 1, at);
  else stage.every(70, (i) => at((i % (path.length + 20)) + 1));

  return () => stage.dispose();
};

export default mount;
