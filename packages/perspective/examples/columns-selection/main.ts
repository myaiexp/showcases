// columns: which columns the view outputs, and in what order
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, button, output } from '../../shared/controls.ts';

const PRESETS: Record<string, string[]> = {
  'Sales, Profit': ['Sales', 'Profit'],
  'Profit, Sales, Region': ['Profit', 'Sales', 'Region'],
  'Order ID, Segment, Quantity, Discount, Sales': ['Order ID', 'Segment', 'Quantity', 'Discount', 'Sales'],
  'Region, State, Category, Sub-Category': ['Region', 'State', 'Category', 'Sub-Category'],
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 90);
  await viewer.load(client);

  let columns = PRESETS['Sales, Profit']!;
  const apply = async (): Promise<void> => {
    // selection_and_ordering.md: columns is an array of names; its order is the display order.
    await viewer.restore({ columns });
    out?.set(JSON.stringify({ columns }, null, 2));
  };
  await viewer.restore({ table: name, plugin: 'Datagrid', settings: false });
  if (bar) {
    select(bar, 'columns', Object.keys(PRESETS), (v) => ((columns = PRESETS[v]!), void apply()));
    button(bar, 'Rotate order', () => {
      columns = [...columns.slice(1), columns[0]!];
      void apply();
    });
  }
  await apply();

  const stop = ctx.preview ? cycle(viewer, Object.values(PRESETS).map((columns) => ({ columns })), 2200) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
