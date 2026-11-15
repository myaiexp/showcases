// Array helpers: extent, span, lerp, clampRange, inrange, merge and friends
import * as vega from 'vega';
import type { Mount } from '@/types.ts';
import { attempt, revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const visited: string[] = [];
  vega.visitArray(
    [0, -1, 2],
    (x: number) => x + 1,
    (v: number, i: number) => visited.push(`${v} at ${i}`),
  );
  const objs = [{ a: 3, b: 2 }, { a: 2, b: 1 }, { a: 1, b: 3 }];
  const rows: [string, () => unknown][] = [
    ['array(5)  /  array([5])', () => [vega.array(5), vega.array([5])]],
    ['extent([3, null, 9, NaN, -2])', () => vega.extent([3, null, 9, NaN, -2])],
    ['extentIndex([1, 5, 3, 0, 4, 2])', () => vega.extentIndex([1, 5, 3, 0, 4, 2])],
    ["extentIndex(objs, field('b'))", () => vega.extentIndex(objs, vega.field('b'))],
    ['peek([4, 8, 15])', () => vega.peek([4, 8, 15])],
    ['span([10, 25, 40])', () => vega.span([10, 25, 40])],
    ['lerp([0, 50], 0.5)', () => vega.lerp([0, 50], 0.5)],
    ['clampRange([8, 12], 0, 10)  (span kept)', () => vega.clampRange([8, 12], 0, 10)],
    ['clampRange([-5, 20], 0, 10)  (too wide)', () => vega.clampRange([-5, 20], 0, 10)],
    ['inrange(10, [0, 10])', () => vega.inrange(10, [0, 10])],
    ['inrange(10, [0, 10], true, false)', () => vega.inrange(10, [0, 10], true, false)],
    ["flush([0, 100], 4, 5, 'L', 'R', 'C')", () => vega.flush([0, 100], 4, 5, 'L', 'R', 'C')],
    ["flush([0, 100], 97, 5, 'L', 'R', 'C')", () => vega.flush([0, 100], 97, 5, 'L', 'R', 'C')],
    ['merge(ascending, [1, 4, 9], [2, 3, 10])', () => vega.merge(vega.ascending, [1, 4, 9], [2, 3, 10])],
    ['toSet([1, 2, 3])', () => vega.toSet([1, 2, 3])],
    ['visitArray([0, -1, 2], x => x + 1, visit)', () => visited],
    ['panLinear([0, 10], 0.5)', () => vega.panLinear([0, 10], 0.5)],
    ['zoomLinear([0, 10], 5, 0.5)', () => vega.zoomLinear([0, 10], 5, 0.5)],
  ];
  const table = rows.map(([call, fn]) => [call, attempt(fn)]);

  const view = await stage.render(tableSpec([{ title: 'call', width: 330 }, { title: 'result', width: 220 }], table, { rowHeight: 16 }));
  revealRows(stage, view, table.length);
  return () => stage.dispose();
};

export default mount;
