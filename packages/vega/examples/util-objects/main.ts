// Object helpers: extend, hasOwnProperty, mergeConfig, lruCache and fastmap
import * as vega from 'vega';
import type { Mount } from '@/types.ts';
import { attempt, revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // The docs' lruCache walk-through: a one-entry cache, so the turnover is visible.
  const cache = vega.lruCache(1);
  cache.set('a', 1);
  cache.set('b', 2);
  const got = cache.get('a');
  cache.set('c', 3);
  const lru = { got, hasC: cache.has('c'), hasB: cache.has('b'), hasA: cache.has('a') };

  const map = vega.fastmap({ foo: 1, bar: 2 });
  map.delete('bar');
  map.set('baz', 0);
  const mapState = { hasBar: map.has('bar'), baz: map.get('baz'), size: map.size, empty: map.empty };
  map.clean();

  const inherited = Object.create({ up: 1 }) as Record<string, number>;
  inherited.own = 2;

  const rows: [string, () => unknown][] = [
    ['extend({a: 1}, {b: 2}, {a: 3})', () => vega.extend({ a: 1 }, { b: 2 }, { a: 3 })],
    ["hasOwnProperty(obj, 'own')", () => vega.hasOwnProperty(inherited, 'own')],
    ["hasOwnProperty(obj, 'up')  (inherited)", () => vega.hasOwnProperty(inherited, 'up')],
    ['lruCache(1): set a, set b, get a, set c', () => lru],
    ['fastmap: delete bar, set baz', () => mapState],
    ['fastmap size after clean()', () => map.size],
    ["mergeConfig({mark: {fill: 'red'}}, {mark: {stroke: 'blue'}})", () => vega.mergeConfig({ mark: { fill: 'red' } }, { mark: { stroke: 'blue' } })],
    ['mergeConfig({range: {x: 1}}, {range: {y: 2}})', () => vega.mergeConfig({ range: { x: 1 } }, { range: { y: 2 } })],
    ["writeConfig({}, 'mark', {a: 1}) then merge", () => {
      const c: Record<string, unknown> = { mark: { b: 2 } };
      vega.writeConfig(c, 'mark', { a: 1 }, true);
      return c;
    }],
  ];
  const table = rows.map(([call, fn]) => [call, attempt(fn)]);
  const view = await stage.render(tableSpec([{ title: 'call', width: 330 }, { title: 'result', width: 250 }], table));
  revealRows(stage, view, table.length);
  return () => stage.dispose();
};

export default mount;
