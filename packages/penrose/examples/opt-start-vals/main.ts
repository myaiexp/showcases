// One double-well objective, several start values: vals decides which well the run finds
import { add, mul, pow, problem, squared, sub, variable } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { chart1d } from '../../shared/opt-charts.ts';
import { el, INK, label } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const STARTS = [-4, -0.3, 0.3, 4];

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const x = variable(0);
  // f(x) = 0.1 x⁴ - 1.2 x² + 0.5 x: two wells, the left one a little deeper
  const f = add(sub(mul(0.1, pow(x, 4)), mul(1.2, squared(x))), mul(0.5, x));
  const p = await problem({ objective: f });
  if (stage.disposed) return () => stage.dispose();
  const chart = await chart1d(stage, { x, curve: f, domain: [-5, 5], top: 14 });
  // Faint ghosts of every start value, so the card shows where each run begins.
  for (const s of STARTS) el('line', { x1: chart.sx(s), x2: chart.sx(s), y1: chart.sy(0) - 4, y2: chart.sy(0) + 4, stroke: INK.target, 'stroke-width': 2 }, chart.layer);
  label(chart.layer, chart.sx(0), 12, 'starts marked in blue', { 'text-anchor': 'middle', fill: INK.target });

  let fixed: number | null = null;
  stage.slider('start x', -5, 5, 0.1, 4, (v) => {
    fixed = v;
    loop.restart();
  });
  const startOf = (attempt: number): number => fixed ?? STARTS[attempt % STARTS.length]!;
  const loop = runLoop(stage, {
    holdMs: 2200,
    begin(attempt) {
      chart.reset();
      const s = startOf(attempt);
      return p.start({ vals: () => s });
    },
    show(run, iteration, attempt) {
      const now = run.vals.get(x) ?? startOf(attempt);
      chart.move(now);
      stage.say(
        `start ${startOf(attempt).toFixed(1)} · iteration ${iteration} · x = ${now.toFixed(2)}${run.converged ? ` · settled in the ${now < 0 ? 'left' : 'right'} well` : ''}`,
        run.converged ? 'ok' : 'info',
      );
    },
  });
  return () => stage.dispose();
};

export default mount;
