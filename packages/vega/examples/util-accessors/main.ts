// Accessor generators: field, key, accessor and the constant functions
import * as vega from 'vega';
import type { Mount } from '@/types.ts';
import { attempt, revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Every row is a real call, made when the example mounts; the table only prints the results.
  const fooField = vega.field('foo');
  const pathField = vega.field('foo.bar', 'path');
  const keyf = vega.key(['foo', 'bar']);
  const flatKey = vega.key(['a.b'], true);
  const double = vega.accessor(((d: { foo: number }) => d.foo * 2) as never, ['foo'], 'double') as unknown as (d: { foo: number }) => number;
  const tuple = { id: 7, foo: 5, bar: 'x', 'a.b': 'flat', nested: { v: 1 } };

  const rows: [string, () => unknown][] = [
    ["field('foo')({foo: 5})", () => fooField({ foo: 5 })],
    ['accessorName(fooField)', () => vega.accessorName(fooField)],
    ['accessorFields(fooField)', () => vega.accessorFields(fooField)],
    ["field('foo.bar', 'path')({foo: {bar: 'vega'}})", () => pathField({ foo: { bar: 'vega' } })],
    ['pathField({foo: 5})', () => pathField({ foo: 5 })],
    ['accessorName(pathField)', () => vega.accessorName(pathField)],
    ['accessorFields(pathField)', () => vega.accessorFields(pathField)],
    ["key(['foo', 'bar'])({foo: 'hi', bar: 5})", () => keyf({ foo: 'hi', bar: 5 })],
    ['accessorName(key)', () => vega.accessorName(keyf)],
    ["key(['a.b'], true)(tuple)  (flat names)", () => flatKey(tuple)],
    ["accessor(d => d.foo * 2, ['foo'], 'double')", () => [double({ foo: 21 }), vega.accessorName(double as never), vega.accessorFields(double as never)]],
    ['accessorFields(Math.abs)  (never annotated)', () => vega.accessorFields(Math.abs as never)],
    ['id(tuple)', () => vega.id(tuple)],
    ['identity(tuple.foo)', () => vega.identity(tuple.foo)],
    ['one(), zero(), truthy(), falsy()', () => [vega.one(null), vega.zero(null), vega.truthy(null), vega.falsy(null)]],
    ["constant(3)('ignored')", () => vega.constant(3)()],
    ['constant(fn) === fn', () => vega.constant(vega.one as never) === (vega.one as never)],
  ];
  const table = rows.map(([call, fn]) => [call, attempt(fn)]);

  const spec = tableSpec([{ title: 'call', width: 330 }, { title: 'result', width: 210 }], table);
  const view = await stage.render(spec);
  revealRows(stage, view, table.length);
  return () => stage.dispose();
};

export default mount;
