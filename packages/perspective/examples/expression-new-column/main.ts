// A new column from an expression, checked with validate_expressions
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

// expressions.md: column names go in double quotes. The last two are deliberate mistakes.
const PRESETS: Record<string, string> = {
  'Profit Ratio': '"Profit" / "Sales"',
  'Cost': '"Sales" - "Profit"',
  'Net Sales': '"Sales" * (1 - "Discount")',
  'Unit Price': '"Sales" / "Quantity"',
  'Type error': '"Region" > 3',
  'Unknown column': '"Revenue" + 1',
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 360 });
  const out = ctx.preview ? null : output(el, 130);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', settings: false });

  const input = document.createElement('input');
  input.style.minWidth = '260px';
  let alias = 'Profit Ratio';
  const apply = async (): Promise<void> => {
    const expressions = { [alias]: input.value };
    // advanced.md § Expression Validation: errors come back instead of a thrown restore().
    const verdict = (await table.validate_expressions(expressions)) as { expression_schema: unknown; errors: Record<string, unknown> };
    out?.set(JSON.stringify(verdict, null, 2));
    if (Object.keys(verdict.errors ?? {}).length > 0) return;
    await viewer.restore({ expressions, columns: ['Region', 'Sales', 'Profit', alias] });
  };
  if (bar) {
    select(bar, 'preset', Object.keys(PRESETS), (v) => {
      alias = v;
      input.value = PRESETS[v]!;
      void apply();
    });
    input.addEventListener('change', () => void apply());
    bar.append(input);
  }
  input.value = PRESETS[alias]!;
  await apply();

  const stop = ctx.preview
    ? cycle(
        viewer,
        ['Profit Ratio', 'Net Sales', 'Unit Price', 'Cost'].map((a) => ({ expressions: { [a]: PRESETS[a]! }, columns: ['Region', 'Sales', 'Profit', a] })),
        2400,
      )
    : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
