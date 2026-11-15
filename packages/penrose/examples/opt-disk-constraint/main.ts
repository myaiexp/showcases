// An objective pulls a point out of a disk; a constraint keeps it on the rim
import { problem, ops, sub, variable } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { plane } from '../../shared/opt-charts.ts';
import { el, INK } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const STARTS: [number, number][] = [[-10, -5], [-7, 6.5], [10, -6]];
const RADIUS = 4;
const TARGET: [number, number] = [9, 3];

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const px = variable(0);
  const py = variable(0);
  const p = [px, py];
  // The objective is the squared distance to the target: smallest when p is on it.
  const objective = ops.vdistsq(p, TARGET);
  // A constraint is a value the optimizer drives to 0 or below: outside the disk it is positive.
  const inside = sub(ops.vdist(p, [0, 0]), RADIUS);
  const pulled = await problem({ objective });
  const held = await problem({ objective, constraints: [inside] });
  if (stage.disposed) return () => stage.dispose();
  const view = await plane(stage, { a: px, b: py, energy: objective, x: [-12, 12], y: [-8.84, 8.84] });
  const unit = view.sx(1) - view.sx(0);
  el('circle', { cx: view.sx(0), cy: view.sy(0), r: RADIUS * unit, fill: 'rgb(47 158 68 / 0.18)', stroke: INK.good, 'stroke-width': 2 }, view.layer);
  el('path', { d: `M${view.sx(TARGET[0]) - 5},${view.sy(TARGET[1]) - 5}l10,10m0,-10l-10,10`, stroke: INK.target, 'stroke-width': 2.5, fill: 'none' }, view.layer);

  let constrained = true;
  let forced = false;
  stage.toggle('keep inside the disk', true, (v) => {
    constrained = v;
    forced = true;
    loop.restart();
  });
  const loop = runLoop(stage, {
    perTick: 1,
    begin(attempt) {
      view.reset();
      if (!forced) constrained = attempt % 2 === 0;
      const [x0, y0] = STARTS[Math.floor(attempt / 2) % STARTS.length]!;
      return (constrained ? held : pulled).start({ vals: (v) => (v === px ? x0 : y0) });
    },
    show(run, iteration, attempt) {
      const [x0, y0] = STARTS[Math.floor(attempt / 2) % STARTS.length]!;
      const [x, y] = [run.vals.get(px) ?? x0, run.vals.get(py) ?? y0];
      view.move(x, y);
      const g = Math.hypot(x, y) - RADIUS;
      stage.say(
        `${constrained ? 'with' : 'without'} the constraint · distance - r = ${g.toFixed(2)}${run.converged ? ' · converged' : ''}`,
        run.converged ? 'ok' : 'info',
      );
      void iteration;
    },
  });
  return () => stage.dispose();
};

export default mount;
