// client.join() with inner, left and outer, and a right_on key
import type { Mount } from '@/types.ts';
import type { JoinType } from '@perspective-dev/client';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { controlBar, select, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const TYPES: JoinType[] = ['inner', 'left', 'outer'];

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  // Product 104 has no match in `products`, and sku 105 has no match in `orders`.
  const orders = s.own(
    await client.table(
      [
        { id: 1, product_id: 101, qty: 5 },
        { id: 2, product_id: 102, qty: 3 },
        { id: 3, product_id: 101, qty: 7 },
        { id: 4, product_id: 104, qty: 2 },
      ],
      { name: uniqueName('orders') },
    ),
  );
  const products = s.own(
    await client.table(
      [
        { sku: 101, name: 'Widget' },
        { sku: 102, name: 'Gadget' },
        { sku: 105, name: 'Gizmo' },
      ],
      { name: uniqueName('products') },
    ),
  );

  // join_types.md and options.md: `on` names the left key; `right_on` names the right
  // table's key when it differs. The result is keyed by `on`, and the right key column is
  // left out. One join per join_type, each its own read-only Table.
  const joins = new Map<JoinType, Awaited<ReturnType<typeof client.join>>>();
  for (const join_type of TYPES) {
    joins.set(join_type, s.own(await client.join(orders, products, 'product_id', { join_type, right_on: 'sku', name: uniqueName(`join_${join_type}`) })));
  }

  const viewer = createViewer(el, ctx, { height: 260, previewHeight: 150 });
  await viewer.load(client);
  s.ownViewer(viewer);
  const out = ctx.preview ? null : output(el, 190);

  const pick = async (type: JoinType): Promise<void> => {
    const joined = joins.get(type)!;
    await viewer.restore({ table: await joined.get_name(), plugin: 'Datagrid', columns: await joined.columns(), settings: false });
    if (!out) return;
    const view = await joined.view();
    const rows = await view.to_json();
    await view.delete();
    out.set(`join_type: "${type}"   (${rows.length} rows)\nschema(): ${show(await joined.schema(), 400)}\nget_index(): ${show(await joined.get_index())}\n\n${rows.map((r) => JSON.stringify(r)).join('\n')}`);
  };

  if (ctx.preview) {
    let i = 0;
    await pick('inner');
    s.every(2200, () => pick(TYPES[++i % 3]!));
    return s.dispose();
  }
  const bar = controlBar(el);
  select(bar, 'join_type', TYPES, (v) => void pick(v as JoinType));
  el.prepend(bar);
  await pick('inner');
  return s.dispose();
};

export default mount;
