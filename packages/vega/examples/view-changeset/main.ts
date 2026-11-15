// Insert and remove on one pulse: two calls lose a change, a changeset keeps both
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface Row {
  id: number;
  v: number;
}
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(52);
  let next = 1;
  const make = (n: number): Row[] => Array.from({ length: n }, () => ({ id: next++, v: Math.round(20 + rand() * 75) }));
  const initial = make(5);
  const copy = (): Row[] => initial.map((r) => ({ ...r }));

  const panel = (name: string, title: string, x: number) => [
    { type: 'text' as const, encode: { enter: { x: { value: x }, y: { value: 0 }, text: { value: title }, fill: { value: '#f59e0b' }, font: { value: 'monospace' }, fontSize: { value: 11 } } } },
    { type: 'rect' as const, from: { data: name }, encode: { update: { x: { signal: `${x} + scale("${name}x", datum.id)` }, width: { signal: `bandwidth("${name}x")` }, y: { signal: `20 + 130 - scale("y", datum.v)` }, height: { signal: 'scale("y", datum.v)' }, fill: { signal: `datum.id > ${initial.length} ? "#f59e0b" : "steelblue"` } } } },
    { type: 'text' as const, encode: { update: { x: { value: x }, y: { value: 168 }, text: { signal: `'rows: ' + length(data("${name}"))` }, fill: { value: '#ddd' }, fontSize: { value: 11 } } } },
  ];
  const spec: Spec = {
    width: 460,
    height: 175,
    padding: 8,
    data: [{ name: 'apart', values: copy() }, { name: 'together', values: copy() }],
    scales: [
      { name: 'y', type: 'linear', domain: [0, 100], range: [0, 130] },
      { name: 'apartx', type: 'band', domain: { data: 'apart', field: 'id' }, range: [0, 210], padding: 0.15 },
      { name: 'togetherx', type: 'band', domain: { data: 'together', field: 'id' }, range: [0, 210], padding: 0.15 },
    ],
    marks: [...panel('apart', 'view.insert + view.remove', 0), ...panel('together', 'view.change(changeset)', 250)],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  await view.runAsync();

  const edit = async (): Promise<void> => {
    const fresh = make(2);
    const fresh2 = fresh.map((r) => ({ ...r }));
    const oldest = (d: Row): boolean => d.id === (view.data('together')[0] as Row | undefined)?.id;
    // Left: two calls, one pulse. The documentation warns against it, and the insert disappears.
    view.insert('apart', fresh).remove('apart', (d: Row) => d.id === (view.data('apart')[0] as Row | undefined)?.id);
    // Right: one changeset carries both operations.
    view.change('together', vega.changeset().insert(fresh2).remove(oldest));
    await view.runAsync();
  };
  const reset = async (): Promise<void> => {
    next = initial.length + 1;
    view.data('apart', copy()).data('together', copy());
    await view.runAsync();
  };
  if (stage.bar) {
    button(stage.bar, 'Add two, drop the oldest', () => void edit());
    button(stage.bar, 'Reset', () => void reset());
  }
  if (stage.preview) stage.every(1500, (i) => (i % 4 === 0 ? reset() : edit()));
  return () => stage.dispose();
};

export default mount;
