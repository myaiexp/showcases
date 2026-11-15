// Minimize (x - 5)^2 from x = 10 with variable, problem and run({ until })
import { pow, problem, sub, variable } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { chart1d } from '../../shared/opt-charts.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const x = variable(10);
  const energy = pow(sub(x, 5), 2);

  // The docs hand the expression to `constraints`; as an `objective` it is minimized the same way.
  const asConstraint = await problem({ constraints: [energy] });
  const asObjective = await problem({ objective: energy });
  if (stage.disposed) return () => stage.dispose();
  const chart = await chart1d(stage, { x, curve: energy, domain: [-2, 12] });

  let mode: 'constraint' | 'objective' | null = null;
  stage.select('(x - 5)² is the', [['constraint', 'constraint (the docs)'], ['objective', 'objective']], 'constraint', (v) => {
    mode = v as 'constraint' | 'objective';
    loop.restart();
  });
  const loop = runLoop(stage, {
    begin(attempt) {
      chart.reset();
      const as = mode ?? (attempt % 2 === 0 ? 'constraint' : 'objective');
      stage.say(`as a ${as}`);
      // start() takes a config; {} means every variable starts at its own val (10).
      return (as === 'constraint' ? asConstraint : asObjective).start({});
    },
    show(run, iteration) {
      // x itself keeps the value it was created with; the Run holds the current ones.
      const now = run.vals.get(x) ?? 10;
      chart.move(now);
      stage.say(`iteration ${iteration} · x = ${now.toFixed(3)}${run.converged ? ' · converged' : ''}`, run.converged ? 'ok' : 'info');
    },
  });
  return () => stage.dispose();
};

export default mount;
