// view.data reads and replaces a data set; insert and remove edit it
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { consoleParts, makeConsole } from '../../shared/api-kit.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface Row {
  id: number;
  v: number;
}
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(41);
  let next = 1;
  const make = (n: number): Row[] => Array.from({ length: n }, () => ({ id: next++, v: Math.round(10 + rand() * 90) }));
  const con = consoleParts({ x: 0, y: 190, width: 470, rows: 5, title: 'view calls' });

  const spec: Spec = {
    width: 470,
    height: 170,
    padding: 8,
    data: [
      { name: 'table', values: make(6) },
      // A pipeline: view.data('big') returns this output, but insert and remove go to 'table'.
      { name: 'big', source: 'table', transform: [{ type: 'filter', expr: 'datum.v >= 50' }] },
      con.data,
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'id' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'left', scale: 'y', tickCount: 4 }],
    marks: [
      { type: 'rect', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'id' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { signal: 'datum.v >= 50 ? "#f59e0b" : "steelblue"' } } } },
      ...con.marks,
    ],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  await view.runAsync();
  const out = makeConsole(view, stage, 5);

  view.addDataListener('big', (name, value) => {
    out.push(`data listener: '${name}' now has ${(value as unknown[]).length} rows`);
    out.soon();
  });
  const rows = (): Row[] => view.data('table') as Row[];
  const done = async (what: string): Promise<void> => {
    await view.runAsync();
    out.push(`${what}  →  data('table').length = ${rows().length}, data('big').length = ${view.data('big').length}`);
    await out.show();
  };
  const ops = [
    () => (view.insert('table', make(3)), done('insert(table, 3 new rows)')),
    () => (view.remove('table', (d: Row) => d.v < 30), done('remove(table, d => d.v < 30)')),
    () => (view.data('table', make(7)), done('data(table, 7 new rows)  replaces everything')),
    () => (view.remove('table', rows().slice(0, 2)), done('remove(table, first two rows)')),
  ];
  if (stage.bar) {
    button(stage.bar, 'insert', () => void ops[0]?.());
    button(stage.bar, 'remove v < 30', () => void ops[1]?.());
    button(stage.bar, 'replace', () => void ops[2]?.());
    button(stage.bar, 'remove first two', () => void ops[3]?.());
  }
  if (stage.preview) stage.every(1300, (i) => ops[i % ops.length]?.());
  return () => stage.dispose();
};

export default mount;
