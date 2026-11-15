// The docs' repel objective: weight / (distance² + eps), with contains keeping circles in a box
import { add, addN, inverse, mul, ops, problem, sub, variable, type Num } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { diskView, makeDisk, reader, type Disk } from '../../shared/disks.ts';
import { INK } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const WEIGHTS = [0.01, 1, 100];

/** constraints.md: the inverse of the squared distance between centres, times a weight. */
const repel = (s1: Disk, s2: Disk, weight: Num = 10e6): Num => {
  const epsDenom = 10e-6;
  const res = inverse(add(ops.vdistsq(s1.center.contents, s2.center.contents), epsDenom));
  return mul(res, weight);
};
const contains = (outer: Disk, inner: Disk): Num =>
  sub(ops.vdist(outer.center.contents, inner.center.contents), sub(outer.r.contents, inner.r.contents));

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const box = makeDisk(0, 0, 1);
  const small = [makeDisk(-0.14, 0.08, 0.3, { center: true }), makeDisk(0.1, 0.14, 0.3, { center: true }), makeDisk(0.02, -0.16, 0.3, { center: true })];
  // The weight is a variable too, but frozen by every start(), so each pass picks its own.
  const weight = variable(1);
  const pairs: Num[] = [];
  small.forEach((s, i) => small.slice(i + 1).forEach((t) => pairs.push(repel(s.disk, t.disk, weight))));
  const p = await problem({ objective: addN(pairs), constraints: small.map((s) => contains(box.disk, s.disk)) });
  if (stage.disposed) return () => stage.dispose();

  const view = diskView(stage, 280, 280);
  view.add(box.disk, { fill: 'rgb(73 80 87 / 0.08)', stroke: INK.fixed });
  const colors = ['#d6336c', '#1c7ed6', '#2f9e44'];
  small.forEach((s, i) => view.add(s.disk, { fill: `${colors[i]}29`, stroke: colors[i]! }));
  const vars = small.flatMap((s) => s.vars);
  const starts = small.flatMap((s) => s.start);
  let w = WEIGHTS[1]!;
  let forced: number | null = null;
  stage.slider('log10 weight', -3, 4, 0.5, 0, (v) => {
    forced = 10 ** v;
    loop.restart();
  });
  let init = new Map<(typeof vars)[number], number>();
  const loop = runLoop(stage, {
    holdMs: 2200,
    begin(attempt) {
      w = forced ?? WEIGHTS[attempt % WEIGHTS.length]!;
      init = new Map<(typeof vars)[number], number>([...vars.map((v, i) => [v, starts[i]!] as const), [weight, w]]);
      return p.start({ vals: (v) => init.get(v) ?? v.val, freeze: (v) => v === weight });
    },
    show(run, iteration) {
      view.update(reader(run, init));
      stage.say(`weight ${w.toPrecision(1)} · iteration ${iteration}${run.converged ? ' · converged' : ''}`, run.converged ? 'ok' : 'info');
    },
  });
  return () => stage.dispose();
};

export default mount;
