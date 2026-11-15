// Only constraints: the run stops as soon as both are at or below 0
import { add, max, mul, problem, squared, sub, variable } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { chart1d } from '../../shared/opt-charts.ts';
import { el, INK, label } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const STARTS = [10, -8, 7, -3];

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const y = variable(0);
  // y must be at least 2 and at most 5: each constraint is positive only when violated.
  const atLeast2 = sub(2, y);
  const atMost5 = sub(y, 5);
  const p = await problem({ constraints: [atLeast2, atMost5] });
  if (stage.disposed) return () => stage.dispose();
  // The curve is the penalty the optimizer minimizes: the squares of the positive parts.
  const penalty = add(squared(max(0, atLeast2)), squared(max(0, atMost5)));
  const chart = await chart1d(stage, { x: y, curve: penalty, domain: [-10, 12], top: 40, readout: (v, e) => `y = ${v.toFixed(2)}   penalty = ${e.toFixed(2)}` });
  el('rect', { x: chart.sx(2), y: 14, width: chart.sx(5) - chart.sx(2), height: chart.sy(0) - 14, fill: 'rgb(47 158 68 / 0.15)' }, chart.layer);
  label(chart.layer, (chart.sx(2) + chart.sx(5)) / 2, 28, 'allowed', { 'text-anchor': 'middle', fill: INK.good });

  let fixed: number | null = null;
  stage.slider('start y', -10, 12, 0.5, 10, (v) => {
    fixed = v;
    loop.restart();
  });
  const startOf = (attempt: number): number => fixed ?? STARTS[attempt % STARTS.length]!;
  const loop = runLoop(stage, {
    begin(attempt) {
      chart.reset();
      const s = startOf(attempt);
      return p.start({ vals: () => s });
    },
    show(run, iteration, attempt) {
      const now = run.vals.get(y) ?? startOf(attempt);
      chart.move(now);
      const ok = now >= 2 - 1e-6 && now <= 5 + 1e-6;
      stage.say(`start ${startOf(attempt).toFixed(1)} · iteration ${iteration}${run.converged ? ` · converged, ${ok ? 'inside' : 'outside'} [2, 5]` : ''}`, run.converged ? 'ok' : 'info');
    },
  });
  return () => stage.dispose();
};

export default mount;
