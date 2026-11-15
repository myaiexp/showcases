// Zero-based inequality: the limit r <= 0.6 written as the energy r - 0.6
import { problem, squared, sub, variable, type Num } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { diskView, makeDisk, reader } from '../../shared/disks.ts';
import { INK, el, label } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const LIMIT = 0.6;
const STARTS = [0.15, 0.98];

/** f(x) <= c becomes the energy f(x) - c, as in the docs' `lessThan`. */
const atMost = (f: Num, c: Num): Num => sub(f, c);

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const circle = makeDisk(0, 0, STARTS[0]!, { radius: true });
  const r = circle.disk.r.contents as ReturnType<typeof variable>;
  const energy = atMost(r, LIMIT);
  // The objective wants r = 1; the constraint says r - 0.6 must not stay positive.
  const p = await problem({ objective: squared(sub(r, 1)), constraints: [energy] });
  if (stage.disposed) return () => stage.dispose();

  const view = diskView(stage, 260, 260);
  view.add(makeDisk(0, 0, LIMIT).disk, { fill: 'none', stroke: INK.axis, dash: '5 4' });
  view.add(circle.disk, { fill: 'rgb(214 51 108 / 0.14)', stroke: INK.iterate });
  label(view.marks, view.px(0), view.py(LIMIT) - 5, `r = ${LIMIT}`, { 'text-anchor': 'middle', fill: INK.axis });
  const bar = el('rect', { x: 20, y: 242, height: 8, rx: 3 }, view.marks);
  let forced: number | null = null;
  stage.slider('start r', 0.05, 1, 0.01, 0.98, (v) => {
    forced = v;
    loop.restart();
  });
  const startOf = (attempt: number): number => forced ?? STARTS[attempt % STARTS.length]!;
  let init = new Map<ReturnType<typeof variable>, number>();
  const loop = runLoop(stage, {
    begin(attempt) {
      init = new Map([[r, startOf(attempt)]]);
      return p.start({ vals: (v) => init.get(v) ?? v.val });
    },
    show(run) {
      const get = reader(run, init);
      view.update(get);
      // The energy r - 60: how far the radius is past the limit (negative: inside it).
      const now = get(r);
      const e = now - LIMIT;
      bar.setAttribute('width', String(Math.min(220, Math.abs(e) * 220 + 2)));
      bar.setAttribute('fill', e > 0.005 ? '#d6336c' : INK.good);
      stage.say(`r = ${now.toFixed(2)} · energy r - ${LIMIT} = ${e.toFixed(2)} · ${e > 0.005 ? 'violated' : 'satisfied'}`, e > 0.005 ? 'warn' : 'ok');
    },
  });
  return () => stage.dispose();
};

export default mount;
