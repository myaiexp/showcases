// view.signal and view.data see the top level; getState sees nested scopes
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { attempt, consoleParts, makeConsole, show } from '../../shared/api-kit.ts';
import { button, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 180, width: 470, rows: 7, title: 'what each call can see' });

  const spec: Spec = {
    width: 440,
    height: 150,
    padding: 8,
    signals: [{ name: 'limit', value: 50, bind: { input: 'range', min: 0, max: 100, step: 5 } }],
    data: [{ name: 'rows', values: Array.from({ length: 6 }, (_, i) => ({ i, v: 15 + ((i * 29) % 80) })), transform: [{ type: 'filter', expr: 'datum.v >= limit' }] }, con.data],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 14], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    marks: [
      { type: 'rect', from: { data: 'rows' }, encode: { update: { x: { scale: 'x', field: 'i' }, width: { value: 20 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' } } } },
      // A nested group with a signal of its own: top-level view.signal cannot reach `local`.
      {
        type: 'group',
        signals: [{ name: 'local', update: 'limit / 100' }],
        marks: [{ type: 'rule', encode: { update: { x: { value: 0 }, x2: { signal: 'width' }, y: { signal: 'height * (1 - local)' }, stroke: { value: '#f59e0b' }, strokeDash: { value: [4, 3] } } } }],
      },
      ...con.marks,
    ],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  await view.runAsync();
  const out = makeConsole(view, stage, 7);

  let added = 0;
  const report = async (): Promise<void> => {
    const state = view.getState() as { signals: Record<string, unknown>; data: Record<string, unknown[]>; subcontext?: { signals: Record<string, unknown> }[] };
    out.clear();
    out.push(
      `view.signal('limit') = ${show(view.signal('limit'))}`,
      `view.signal('local') → ${attempt(() => view.signal('local'))}`,
      `getState().subcontext[0].signals = ${show(state.subcontext?.[0]?.signals)}`,
      `view.data('rows') = ${view.data('rows').length} rows  (after the filter)`,
      `getState().data.rows = ${state.data.rows ? `${state.data.rows.length} rows (the input)` : 'absent: no change through the View API yet'}`,
      `getState().signals has ${Object.keys(state.signals).length} entries, among them width ${show(state.signals.width)}`,
    );
    await out.show();
  };
  const insert = async (): Promise<void> => {
    added++;
    view.insert('rows', [{ i: 6 + added, v: 20 + ((added * 37) % 75) }]);
    await view.runAsync();
    await report();
  };
  view.addSignalListener('limit', () => view.runAfter(() => void report()));
  await report();
  if (stage.bar) button(stage.bar, 'view.insert a row', () => void insert());
  if (stage.bar) slider(stage.bar, 'limit (via view.signal)', [0, 100, 5], 50, (v) => void view.signal('limit', v).runAsync());
  if (stage.preview) {
    stage.every(1300, async (i) => {
      if (i % 3 === 0) await insert();
      else {
        view.signal('limit', [20, 65, 40, 80][i % 4] ?? 50);
        await view.runAsync();
      }
    });
  }
  return () => stage.dispose();
};

export default mount;
