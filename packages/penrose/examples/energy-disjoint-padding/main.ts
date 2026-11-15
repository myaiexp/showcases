// disjointPadding: r1 + r2 + padding - d at most 0 keeps a gap between circles
import { add, ops, problem, sub, variable, type Num } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { diskView, makeDisk, reader, type Disk } from '../../shared/disks.ts';
import { INK, el } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

/* d(c1, c2) >= r1 + r2 + padding (the docs' second exercise solution) */
const disjointPadding = (s1: Disk, s2: Disk, padding: Num): Num => {
  const res = add(add(s1.r.contents, s2.r.contents), padding);
  return sub(res, ops.vdist(s1.center.contents, s2.center.contents));
};

const PADDINGS = [0, 0.2, 0.45];

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const a = makeDisk(-0.9, 0.12, 0.34, { center: true });
  const b = makeDisk(0.9, -0.12, 0.48, { center: true });
  // The padding is a variable that start() freezes at the value the pass picks.
  const padding = variable(0);
  const p = await problem({
    objective: ops.vdist(a.disk.center.contents, b.disk.center.contents),
    constraints: [disjointPadding(a.disk, b.disk, padding)],
  });
  if (stage.disposed) return () => stage.dispose();

  const view = diskView(stage, 300, 220);
  view.add(a.disk, { fill: 'rgb(214 51 108 / 0.16)', stroke: INK.iterate });
  view.add(b.disk, { fill: 'rgb(28 126 214 / 0.16)', stroke: INK.target });
  // The gap between the rims, drawn as a segment along the line of centres.
  const gap = el('line', { stroke: INK.good, 'stroke-width': 4, 'stroke-linecap': 'round' }, view.marks);
  const vars = [...a.vars, ...b.vars];
  const starts = [...a.start, ...b.start];
  let pad = 0;
  let forced: number | null = null;
  stage.slider('padding', 0, 0.6, 0.01, 0.2, (v) => {
    forced = v;
    loop.restart();
  });
  let init = new Map<(typeof vars)[number], number>();
  const loop = runLoop(stage, {
    begin(attempt) {
      pad = forced ?? PADDINGS[attempt % PADDINGS.length]!;
      init = new Map<(typeof vars)[number], number>([...vars.map((v, i) => [v, starts[i]!] as const), [padding, pad]]);
      return p.start({ vals: (v) => init.get(v) ?? v.val, freeze: (v) => v === padding });
    },
    show(run) {
      const get = reader(run, init);
      view.update(get);
      const [ax, ay, bx, by] = vars.map(get) as [number, number, number, number];
      const d = Math.hypot(bx - ax, by - ay) || 1;
      const [ux, uy] = [(bx - ax) / d, (by - ay) / d];
      const [s, t] = [0.34, d - 0.48];
      gap.setAttribute('x1', String(view.px(ax + ux * s)));
      gap.setAttribute('y1', String(view.py(ay + uy * s)));
      gap.setAttribute('x2', String(view.px(ax + ux * t)));
      gap.setAttribute('y2', String(view.py(ay + uy * t)));
      stage.say(`padding ${pad} · gap between the rims ${(d - 0.34 - 0.48).toFixed(2)}${run.converged ? ' · converged' : ''}`, run.converged ? 'ok' : 'info');
    },
  });
  return () => stage.dispose();
};

export default mount;
