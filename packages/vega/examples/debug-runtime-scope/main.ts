// view._runtime exposes the dataflow operators: signals, data and scales
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { show, tableData, tableParts } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

// Not an official API: the debugging page calls it a last resort, and says never to modify it.
interface Runtime {
  signals: Record<string, { value: unknown }>;
  data: Record<string, { input: { value: unknown[] }; output: { value: unknown[] }; values: { value: unknown[] } }>;
  scales: Record<string, { value: { type?: string; domain(): unknown } }>;
  nodes: Record<string, unknown>;
  subcontext?: unknown[];
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const table = tableParts([{ title: 'in view._runtime', width: 250 }, { title: 'value', width: 190 }], new Array(8).fill(['', '']) as string[][], { x: 250, y: 0 });

  const spec: Spec = {
    width: 220,
    height: 130,
    padding: 8,
    signals: [{ name: 'cutoff', value: 50, bind: { input: 'range', min: 0, max: 100, step: 5 } }, { name: 'shown', value: 8 }],
    data: [
      { name: 'kept', values: Array.from({ length: 12 }, (_, i) => ({ i, v: 12 + ((i * 41) % 86) })), transform: [{ type: 'filter', expr: 'datum.v >= cutoff' }] },
      table.data,
    ],
    scales: [
      { name: 'x', type: 'band', domain: Array.from({ length: 12 }, (_, i) => i), range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'left', scale: 'y', tickCount: 3 }],
    marks: [{ type: 'rect', from: { data: 'kept' }, encode: { update: { x: { scale: 'x', field: 'i' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: '#f59e0b' } } } }, ...table.marks],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  await view.runAsync();

  // Everything is read from the operators; only our own readout data set is written, through the View API.
  const read = async (): Promise<void> => {
    const rt = (view as unknown as { _runtime: Runtime })._runtime;
    const d = rt.data;
    const rows = [
      ['signals.cutoff.value', show(rt.signals.cutoff?.value)],
      ['data.kept.input.value  (before filter)', `${d.kept?.input.value.length} rows`],
      ['data.kept.values.value (after filter)', `${d.kept?.values.value.length} rows`],
      ["view.data('kept')  (the same output)", `${view.data('kept').length} rows`],
      ['scales.y.value: type, domain()', `${rt.scales.y?.value.type} ${show(rt.scales.y?.value.domain())}`],
      ['Object.keys(nodes).length', String(Object.keys(rt.nodes).length)],
      // The guide lists subcontext, but a spec without nested groups leaves it undefined in 6.4.0.
      ['subcontext (no nested groups here)', show(rt.subcontext)],
    ];
    view.data('table', tableData(rows));
    await view.runAsync();
  };
  await read();
  view.addSignalListener('cutoff', () => {
    // The listener runs mid-evaluation: read once the run is over.
    view.runAfter(() => void read());
  });
  if (stage.preview) {
    stage.every(1100, (i) => {
      view.signal('cutoff', [20, 60, 85, 35, 70][i % 5] ?? 50);
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
