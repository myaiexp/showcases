// freeze in start(): the optimizer leaves one variable where it started
import { ops, problem, variable } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { plane } from '../../shared/opt-charts.ts';
import { el, INK } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const TARGET: [number, number] = [6, 4];
const START: [number, number] = [-8, -3];
const MODES = [['y', 'freeze y'], ['x', 'freeze x'], ['none', 'freeze nothing']] as const;

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const x = variable(0);
  const y = variable(0);
  const objective = ops.vdistsq([x, y], TARGET);
  const p = await problem({ objective });
  if (stage.disposed) return () => stage.dispose();
  const view = await plane(stage, { a: x, b: y, energy: objective, x: [-12, 12], y: [-8.84, 8.84] });
  el('path', { d: `M${view.sx(TARGET[0]) - 5},${view.sy(TARGET[1]) - 5}l10,10m0,-10l-10,10`, stroke: INK.target, 'stroke-width': 2.5, fill: 'none' }, view.layer);
  // The line the frozen variable holds the point to.
  const guide = el('line', { stroke: INK.fixed, 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }, view.layer);

  let forced: number | null = null;
  stage.select('freeze', MODES.map(([v, t]) => [v, t] as [string, string]), 'y', (v) => {
    forced = MODES.findIndex((m) => m[0] === v);
    loop.restart();
  });
  const modeOf = (attempt: number) => MODES[forced ?? attempt % MODES.length]![0];
  const loop = runLoop(stage, {
    begin(attempt) {
      view.reset();
      const mode = modeOf(attempt);
      const [gx1, gx2, gy1, gy2] =
        mode === 'y' ? [8, 316, view.sy(START[1]), view.sy(START[1])]
        : mode === 'x' ? [view.sx(START[0]), view.sx(START[0]), 8, 232]
        : [0, 0, 0, 0];
      for (const [k, v] of Object.entries({ x1: gx1, x2: gx2, y1: gy1, y2: gy2 })) guide.setAttribute(k, String(v));
      // freeze(v) answers for each variable; vals(v) gives the start of the ones that move and of the frozen one.
      return p.start({
        vals: (v) => (v === x ? START[0] : START[1]),
        freeze: (v) => (mode === 'y' && v === y) || (mode === 'x' && v === x),
      });
    },
    show(run, iteration, attempt) {
      const mode = modeOf(attempt);
      // Frozen variables are missing from run.vals, so fall back to where they started.
      const [px, py] = [run.vals.get(x) ?? START[0], run.vals.get(y) ?? START[1]];
      view.move(px, py);
      stage.say(
        `${mode === 'none' ? 'nothing frozen' : `${mode} frozen`} · moving: ${[...run.vals.keys()].map((k) => (k === x ? 'x' : 'y')).join(', ') || 'none'} · (${px.toFixed(1)}, ${py.toFixed(1)})${run.converged ? ' · converged' : ''}`,
        run.converged ? 'ok' : 'info',
      );
      void iteration;
    },
  });
  return () => stage.dispose();
};

export default mount;
