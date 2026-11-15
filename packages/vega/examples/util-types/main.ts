// Type checkers as a grid: nine sample values against nine is* functions
import * as vega from 'vega';
import type { Mount } from '@/types.ts';
import { revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const samples: [string, unknown][] = [
    ['5', 5], ["'5'", '5'], ['true', true], ['new Date(0)', new Date(0)], ['[1, 2]', [1, 2]], ['{}', {}], ['/x/', /x/], ['Math.abs', Math.abs], ['new Set()', new Set()],
  ];
  const checks = [
    ['isNumber', vega.isNumber], ['isString', vega.isString], ['isBoolean', vega.isBoolean], ['isDate', vega.isDate],
    ['isArray', vega.isArray], ['isObject', vega.isObject], ['isRegExp', vega.isRegExp], ['isFunction', vega.isFunction], ['isIterable', vega.isIterable],
  ] as [string, (v: unknown) => boolean][];
  // One row per sample value; one column per checker, marking the true ones.
  const grid = samples.map(([label, v]) => [label, ...checks.map(([, f]) => (f(v) ? 'yes' : '·'))]);
  const rows = grid;

  const colw = 62;
  const columns = [{ title: 'value', width: 100 }, ...checks.map(([name]) => ({ title: name.slice(2), width: colw }))];
  const spec = tableSpec(columns, rows, { rowHeight: 17, accent: false });
  const view = await stage.render(spec);
  revealRows(stage, view, rows.length);
  return () => stage.dispose();
};

export default mount;
