// disjoint: circles do not overlap when r1 + r2 - d is at most 0
import { add, ops, problem, sub, type Num } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { diskView, makeDisk, reader, type Disk } from '../../shared/disks.ts';
import { INK, el } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

/* d(c1, c2) >= r1 + r2, so the energy is r1 + r2 - d (the docs' first exercise solution) */
const disjoint = (s1: Disk, s2: Disk): Num => {
  const res = add(s1.r.contents, s2.r.contents);
  return sub(res, ops.vdist(s1.center.contents, s2.center.contents));
};

const STARTS = [{ a: [-1.1, 0.1], b: [1.1, -0.2] }, { a: [-0.08, 0.05], b: [0.1, -0.04] }, { a: [-0.3, 0.9], b: [0.4, 0.7] }] as const;

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const a = makeDisk(0, 0, 0.38, { center: true });
  const b = makeDisk(0, 0, 0.54, { center: true });
  // Objective: the squared distance between the centres, so the circles want to meet.
  const p = await problem({ objective: ops.vdist(a.disk.center.contents, b.disk.center.contents), constraints: [disjoint(a.disk, b.disk)] });
  if (stage.disposed) return () => stage.dispose();

  const view = diskView(stage, 300, 220);
  view.add(a.disk, { fill: 'rgb(214 51 108 / 0.16)', stroke: INK.iterate, label: 'A' });
  view.add(b.disk, { fill: 'rgb(28 126 214 / 0.16)', stroke: INK.target, label: 'B' });
  const link = el('line', { stroke: INK.good, 'stroke-width': 2.5 }, view.marks);
  const vars = [...a.vars, ...b.vars];
  let init = new Map<(typeof vars)[number], number>();
  runLoop(stage, {
    begin(attempt) {
      const s = STARTS[attempt % STARTS.length]!;
      init = new Map(vars.map((v, i) => [v, [...s.a, ...s.b][i]!]));
      return p.start({ vals: (v) => init.get(v) ?? v.val });
    },
    show(run) {
      const get = reader(run, init);
      view.update(get);
      const [ax, ay, bx, by] = vars.map(get) as [number, number, number, number];
      link.setAttribute('x1', String(view.px(ax)));
      link.setAttribute('y1', String(view.py(ay)));
      link.setAttribute('x2', String(view.px(bx)));
      link.setAttribute('y2', String(view.py(by)));
      const d = Math.hypot(ax - bx, ay - by);
      const e = 0.38 + 0.54 - d;
      stage.say(`d = ${d.toFixed(2)} · energy r1 + r2 - d = ${e.toFixed(2)}${e <= 0.005 ? ' · disjoint' : ' · overlapping'}`, e <= 0.005 ? 'ok' : 'warn');
    },
  });
  return () => stage.dispose();
};

export default mount;
