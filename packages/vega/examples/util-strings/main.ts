// String helpers: pad, repeat, truncate, splitAccessPath and stringValue
import * as vega from 'vega';
import type { Mount } from '@/types.ts';
import { attempt, revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const rows: [string, () => unknown][] = [
    ["pad('15', 5, '0', 'left')", () => vega.pad('15', 5, '0', 'left')],
    ["pad('ab', 6, '-')  (default: end)", () => vega.pad('ab', 6, '-')],
    ["pad('ab', 7, '*', 'center')", () => vega.pad('ab', 7, '*', 'center')],
    ["repeat('0', 5)", () => vega.repeat('0', 5)],
    ["repeat('ab', 3)", () => vega.repeat('ab', 3)],
    ["truncate('Wednesday', 6)", () => vega.truncate('Wednesday', 6)],
    ["truncate('Wednesday', 6, 'left')", () => vega.truncate('Wednesday', 6, 'left')],
    ["truncate('Wednesday', 6, 'center')", () => vega.truncate('Wednesday', 6, 'center')],
    ["truncate('Wednesday', 6, 'right', '...')", () => vega.truncate('Wednesday', 6, 'right' as never, '...')],
    ["splitAccessPath('foo')", () => vega.splitAccessPath('foo')],
    ["splitAccessPath('foo.bar')", () => vega.splitAccessPath('foo.bar')],
    ['splitAccessPath(\'foo["bar"]\')', () => vega.splitAccessPath('foo["bar"]')],
    ["splitAccessPath('foo[0].bar')", () => vega.splitAccessPath('foo[0].bar')],
    ["stringValue('say \"hi\"')", () => vega.stringValue('say "hi"')],
    ['stringValue({a: [1, 2]})', () => vega.stringValue({ a: [1, 2] })],
    ['stringValue(42), stringValue(true)', () => [vega.stringValue(42), vega.stringValue(true)]],
  ];
  const table = rows.map(([call, fn]) => [call, attempt(fn)]);
  const view = await stage.render(tableSpec([{ title: 'call', width: 330 }, { title: 'result', width: 220 }], table));
  revealRows(stage, view, table.length);
  return () => stage.dispose();
};

export default mount;
