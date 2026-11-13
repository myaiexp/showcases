// Conditional and numeric expressions: ?:, inrange, percent_of, clamp, bucket
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

interface Preset {
  expr: string;
  grouped: boolean;
}
// expressions.md: Operators, Numeric Functions, Other Functions.
const PRESETS: Record<string, Preset> = {
  'Loss or gain (?:)': { expr: `"Profit" < 0 ? 'Loss' : 'Gain'`, grouped: true },
  'Profit band (nested ?:)': { expr: `"Profit" < 0 ? 'Loss' : ("Profit" < 100 ? 'Small' : 'Large')`, grouped: true },
  'Sales bucket (bucket 500)': { expr: 'bucket("Sales", 500)', grouped: true },
  'Mid discount (inrange)': { expr: 'inrange(0.1, "Discount", 0.3)', grouped: true },
  'Margin % (percent_of)': { expr: 'percent_of("Profit", "Sales")', grouped: false },
  'Clamped profit (clamp)': { expr: 'clamp(0, "Profit", 100)', grouped: false },
  'Rounded sales (round)': { expr: 'round("Sales")', grouped: false },
};

const configFor = (alias: string): ViewerConfigUpdate => {
  const p = PRESETS[alias]!;
  return {
    expressions: { [alias]: p.expr },
    group_by: p.grouped ? [alias] : [],
    columns: p.grouped ? ['Sales', 'Profit'] : ['Order ID', 'Sales', 'Profit', alias],
  };
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 90);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', settings: false });

  const apply = async (alias: string): Promise<void> => {
    await viewer.restore(configFor(alias));
    out?.set(JSON.stringify({ expressions: { [alias]: PRESETS[alias]!.expr } }, null, 2));
  };
  if (bar) select(bar, 'expression', Object.keys(PRESETS), (v) => void apply(v));
  await apply('Loss or gain (?:)');

  const steps = ['Loss or gain (?:)', 'Profit band (nested ?:)', 'Sales bucket (bucket 500)', 'Margin % (percent_of)'];
  const stop = ctx.preview ? cycle(viewer, steps.map(configFor), 2400) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
