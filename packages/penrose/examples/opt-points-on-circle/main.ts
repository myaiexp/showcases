// Many variables: points repel each other while a constraint holds them on a ring
import { absVal, addN, inverse, mul, ops, problem, sub, variable, type Num, type Problem, type Var } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { INK, el, makeSvg } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const R = 80;
const HUES = [340, 25, 48, 130, 175, 210, 255, 290, 315, 5];

/** n points, each a pair of variables, starting bunched on one side of the ring. */
async function build(n: number): Promise<{ p: Problem; pts: Var[][]; startFor(attempt: number): number[] }> {
  const pts = Array.from({ length: n }, () => [variable(0), variable(0)]);
  // Start angles bunch in an arc whose position changes with the attempt.
  const startFor = (attempt: number): number[] =>
    pts.flatMap((_, i) => {
      const t = attempt * 1.7 + i * 0.25;
      return [R * 0.9 * Math.cos(t), R * 0.9 * Math.sin(t)];
    });
  const repel: Num[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) repel.push(inverse(ops.vdistsq(pts[i]!, pts[j]!)));
  }
  // |p| = R as a constraint: the absolute value is 0 only on the ring.
  const onRing = pts.map((q) => absVal(sub(ops.vnorm(q), R)));
  // 1 / d² is tiny for pixel distances, so the objective carries a weight, as `repel` does in constraints.md.
  const p = await problem({ objective: mul(1e6, addN(repel)), constraints: onRing });
  return { p, pts, startFor };
}

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const svg = makeSvg(stage, 240, 240);
  el('circle', { cx: 120, cy: 120, r: R, fill: 'none', stroke: INK.faint, 'stroke-width': 2, 'stroke-dasharray': '4 4' }, svg);
  const dots = el('g', {}, svg);
  let n = ctx.preview ? 6 : 7;
  let current = await build(n);
  if (stage.disposed) return () => stage.dispose();
  let loop: ReturnType<typeof runLoop>;
  let begun: number[] = [];
  stage.slider('points', 3, 10, 1, n, (v) => {
    n = v;
    void build(n).then((b) => {
      if (stage.disposed) return () => stage.dispose();
      current = b;
      loop.restart();
    });
  });
  const draw = (get: (v: Var) => number): void => {
    dots.replaceChildren();
    current.pts.forEach((q, i) => {
      el('circle', { cx: 120 + get(q[0]!), cy: 120 - get(q[1]!), r: 7, fill: `hsl(${HUES[i % HUES.length]} 70% 55%)`, stroke: '#fff', 'stroke-width': 1.5 }, dots);
    });
  };
  loop = runLoop(stage, {
    perTick: 2,
    tickMs: 60,
    cap: 160,
    holdMs: 2000,
    begin(attempt) {
      const b = current;
      begun = b.startFor(attempt);
      return b.p.start({ vals: (v) => begun[b.pts.flat().indexOf(v)] ?? 0 });
    },
    show(run, iteration) {
      const b = current;
      draw((v) => run.vals.get(v) ?? begun[b.pts.flat().indexOf(v)] ?? 0);
      stage.say(`${n} points · iteration ${iteration}${run.converged ? ' · converged' : ''}`, run.converged ? 'ok' : 'info');
    },
  });
  return () => stage.dispose();
};

export default mount;
