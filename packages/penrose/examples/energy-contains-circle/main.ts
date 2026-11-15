// contains for circles, derived: d - (r_B - r_A) must be at most 0
import { ops, problem, sub, type Num } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { diskView, makeDisk, reader, type Disk } from '../../shared/disks.ts';
import { INK, el } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const TARGETS: [number, number][] = [[1.2, 0.3], [-0.9, -0.8], [0.1, 1.18]];

/**
 * Circle `inner` is inside `outer` when d + r_inner <= r_outer, that is, when
 * d - (r_outer - r_inner) <= 0. That left side is the energy.
 */
const contains = (outer: Disk, inner: Disk): Num =>
  sub(ops.vdist(outer.center.contents, inner.center.contents), sub(outer.r.contents, inner.r.contents));

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const b = makeDisk(0, 0, 0.8);
  const a = makeDisk(-0.3, 0.2, 0.28, { center: true });
  const [ax, ay] = a.vars as [typeof a.vars[0], typeof a.vars[0]];
  let target = TARGETS[0]!;
  // Objective: squared distance from A's centre to a target outside B.
  const pull = (t: [number, number]) => ops.vdist(a.disk.center.contents, t);
  const problems = await Promise.all(TARGETS.map((t) => problem({ objective: pull(t), constraints: [contains(b.disk, a.disk)] })));
  if (stage.disposed) return () => stage.dispose();

  const view = diskView(stage, 280, 280);
  view.add(b.disk, { fill: 'rgb(73 80 87 / 0.1)', stroke: INK.fixed, label: 'B' });
  view.add(a.disk, { fill: 'rgb(214 51 108 / 0.16)', stroke: INK.iterate, label: 'A' });
  const cross = el('path', { stroke: INK.target, 'stroke-width': 2.5, fill: 'none' }, view.marks);
  const link = el('line', { stroke: INK.good, 'stroke-width': 2.5 }, view.marks);
  const init = new Map([[ax, a.start[0]!], [ay, a.start[1]!]]);
  const loop = runLoop(stage, {
    begin(attempt) {
      target = TARGETS[attempt % TARGETS.length]!;
      const [tx, ty] = [view.px(target[0]), view.py(target[1])];
      cross.setAttribute('d', `M${tx - 5},${ty - 5}l10,10m0,-10l-10,10`);
      return problems[attempt % TARGETS.length]!.start({ vals: (v) => init.get(v) ?? v.val });
    },
    show(run) {
      const get = reader(run, init);
      view.update(get);
      const [x, y] = [get(ax), get(ay)];
      // d is the green segment between the two centres.
      link.setAttribute('x1', String(view.px(0)));
      link.setAttribute('y1', String(view.py(0)));
      link.setAttribute('x2', String(view.px(x)));
      link.setAttribute('y2', String(view.py(y)));
      const d = Math.hypot(x, y);
      const energy = d - (0.8 - 0.28);
      stage.say(`d = ${d.toFixed(2)} · energy d - (r_B - r_A) = ${energy.toFixed(2)} · ${energy > 0.005 ? 'A sticks out' : 'A is inside B'}`, energy > 0.005 ? 'warn' : 'ok');
    },
  });
  return () => stage.dispose();
};

export default mount;
