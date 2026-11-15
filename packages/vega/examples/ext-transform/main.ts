// vega.transforms adds a data transform: a running maximum over streaming readings
import * as vega from 'vega';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// A transform is an operator class with a static Definition describing its parameters. Vega lower-cases
// Definition.type and looks it up in vega.transforms, so the key and the type are kept lower-case.
// Defaults declared in a Definition are not applied by the parser: the spec passes `as` itself.
// vega's typings do not export these two names, so the bits this transform touches are typed here.
type Parameters = { field?: unknown; as?: unknown };
interface Pulse {
  readonly ALL: number;
  readonly SOURCE: number;
  fork(flags: number): Pulse;
  visit(flags: number, fn: (t: Record<string, number>) => void): void;
  modifies(field: string): Pulse;
}
class RunningMax extends vega.Transform {
  static Definition = {
    type: 'showcase-runmax',
    metadata: { modifies: true },
    params: [{ name: 'field', type: 'field', required: true }, { name: 'as', type: 'string' }],
  };
  constructor(params: Parameters) {
    super(-Infinity, params as never);
  }
  override transform(_: Parameters, pulse: Pulse): never {
    const out = pulse.fork(pulse.ALL);
    let max = -Infinity;
    // Visit every live tuple in source order and write the maximum so far onto it.
    pulse.visit(pulse.SOURCE, (t) => {
      max = Math.max(max, (_.field as (d: unknown) => number)(t));
      t[_.as as string] = max;
    });
    return out.modifies(_.as as string) as never;
  }
}
(vega.transforms as Record<string, unknown>)['showcase-runmax'] = RunningMax;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(31);
  let n = 0;
  const reading = (): { n: number; v: number } => ({ n: n++, v: Math.round(20 + 60 * rand() ** 1.6) });
  const window = 24;

  const spec: Spec = {
    width: 440,
    height: 170,
    padding: 8,
    signals: [{ name: 'lo', value: 0 }],
    data: [{ name: 'readings', values: Array.from({ length: 10 }, reading), transform: [{ type: 'showcase-runmax', field: 'v', as: 'peak' } as never] }],
    scales: [
      { name: 'x', type: 'linear', domain: { signal: '[lo, lo + 23]' }, range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'left', scale: 'y', tickCount: 5 }],
    marks: [
      { type: 'rect', from: { data: 'readings' }, encode: { update: { x: { scale: 'x', field: 'n' }, width: { value: 12 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.75 } } } },
      { type: 'line', from: { data: 'readings' }, encode: { update: { x: { scale: 'x', field: 'n', offset: 6 }, y: { scale: 'y', field: 'peak' }, stroke: { value: '#f59e0b' }, strokeWidth: { value: 2.5 }, interpolate: { value: 'step-after' } } } },
      { type: 'text', encode: { update: { x: { value: 6 }, y: { value: 10 }, text: { value: "{type: 'showcase-runmax', field: 'v', as: 'peak'}" }, fill: { value: '#ddd' }, font: { value: 'monospace' }, fontSize: { value: 11 } } } },
    ],
  };
  const view = await stage.render(spec);

  const push = async (): Promise<void> => {
    const row = reading();
    // The oldest reading leaves with each arrival, so the running maximum can fall as well as rise.
    view.change('readings', vega.changeset().insert([row]).remove((d: { n: number }) => d.n < row.n - window + 1));
    view.signal('lo', Math.max(0, row.n - window + 2));
    await view.runAsync();
  };
  stage.every(stage.preview ? 450 : 700, push);
  if (stage.bar) button(stage.bar, 'Add a spike', () => void view.change('readings', vega.changeset().insert([{ n: n++, v: 97 }])).runAsync());
  return () => stage.dispose();
};

export default mount;
