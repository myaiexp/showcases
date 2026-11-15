// Coercions: toNumber, toBoolean, toString and toDate, and how they treat empties
import * as vega from 'vega';
import type { Mount } from '@/types.ts';
import { attempt, revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // null and the empty string map to null for all four; the strings "true" and "1" are the true ones.
  const d = (v: unknown): unknown => (v == null ? v : new Date(v as number));
  const rows: [string, () => unknown][] = [
    ["toNumber('12.5')", () => vega.toNumber('12.5')],
    ["toNumber('abc')", () => vega.toNumber('abc')],
    ["toNumber('')", () => vega.toNumber('')],
    ['toNumber(null)', () => vega.toNumber(null)],
    ["toBoolean('true')", () => vega.toBoolean('true')],
    ["toBoolean('1')", () => vega.toBoolean('1')],
    ["toBoolean('0')", () => vega.toBoolean('0')],
    ["toBoolean('')", () => vega.toBoolean('')],
    ["toBoolean('yes')", () => vega.toBoolean('yes')],
    ['toString(5)', () => vega.toString(5)],
    ["toString('')", () => vega.toString('')],
    ['toString(null)', () => vega.toString(null)],
    ["toDate('2020-03-04')  (as a Date)", () => d(vega.toDate('2020-03-04'))],
    ['toDate(86400000)  (a timestamp passes)', () => vega.toDate(86400000)],
    ["toDate('')", () => vega.toDate('')],
    ["toDate('4/3', parser)  (custom parser)", () => d(vega.toDate('4/3', () => Date.UTC(2001, 2, 4)))],
  ];
  const table = rows.map(([call, fn]) => [call, attempt(fn)]);
  const view = await stage.render(tableSpec([{ title: 'call', width: 300 }, { title: 'result', width: 220 }], table));
  revealRows(stage, view, table.length);
  return () => stage.dispose();
};

export default mount;
