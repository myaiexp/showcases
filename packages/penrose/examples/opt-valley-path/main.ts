// Two variables and a curved valley: the iterate's path, one run per start point
import { add, mul, problem, squared, sub, variable } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { plane } from '../../shared/opt-charts.ts';
import { el } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const STARTS: [number, number][] = [[-1.5, 2], [1.8, -0.6], [-0.4, 3.2]];

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const a = variable(0);
  const b = variable(0);
  // f(a, b) = (1 - a)² + 5 (b - a²)²: a curved valley whose floor is b = a², lowest at (1, 1)
  const f = add(squared(sub(1, a)), mul(5, squared(sub(b, squared(a)))));
  const p = await problem({ objective: f });
  if (stage.disposed) return () => stage.dispose();
  const view = await plane(stage, { a, b, energy: f, x: [-2, 2.2], y: [-1, 3.6] });
  el('circle', { cx: view.sx(1), cy: view.sy(1), r: 4, fill: 'none', stroke: '#1c7ed6', 'stroke-width': 2 }, view.layer);

  let fixed: number | null = null;
  stage.select('start', STARTS.map((s, i) => [String(i), `(${s[0]}, ${s[1]})`] as [string, string]), '0', (v) => {
    fixed = Number(v);
    loop.restart();
  });
  const loop = runLoop(stage, {
    begin(attempt) {
      view.reset();
      const [x0, y0] = STARTS[fixed ?? attempt % STARTS.length]!;
      // `vals` is asked for each variable's starting value.
      return p.start({ vals: (v) => (v === a ? x0 : y0) });
    },
    show(run, iteration, attempt) {
      const [x0, y0] = STARTS[fixed ?? attempt % STARTS.length]!;
      const [pa, pb] = [run.vals.get(a) ?? x0, run.vals.get(b) ?? y0];
      view.move(pa, pb);
      stage.say(`iteration ${iteration} · (${pa.toFixed(2)}, ${pb.toFixed(2)})${run.converged ? ' · converged' : ''}`, run.converged ? 'ok' : 'info');
    },
  });
  return () => stage.dispose();
};

export default mount;
