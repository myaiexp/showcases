// Datagrid edit_mode: edit cells into the Table, or select and filter
import type { Mount } from '@/types.ts';
import type { PerspectiveSelectDetail } from '@perspective-dev/viewer';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output, every } from '../../shared/controls.ts';

const MODES = ['EDIT', 'SELECT_ROW', 'SELECT_COLUMN', 'SELECT_REGION', 'SELECT_ROW_TREE', 'READ_ONLY'];

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  // EDIT writes back to the Table, keyed by its index.
  const table = await client.table(orders(40), { name, index: 'Order ID' });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 150);
  await viewer.load(client);
  await viewer.restore({
    table: name,
    plugin: 'Datagrid',
    columns: ['Order ID', 'State', 'Category', 'Quantity', 'Sales'],
    plugin_config: { edit_mode: 'EDIT' },
  });

  // An edit is an ordinary table update, so a View of our own sees it.
  const view = await table.view();
  await view.on_update(() => out?.log('table updated by an edit'));

  // events.md § Selection events: the SELECT_* modes emit perspective-select. Its detail
  // holds configs to remove, then configs to insert; the getters flatten them to filters.
  const onSelect = (event: Event): void => {
    const detail = (event as CustomEvent<PerspectiveSelectDetail>).detail;
    out?.log(
      `perspective-select → selected ${detail.selected}, insertFilters ${JSON.stringify(detail.insertFilters)}, removeFilters ${JSON.stringify(detail.removeFilters)}`,
    );
  };
  viewer.addEventListener('perspective-select', onSelect);

  let stop = (): void => {};
  if (ctx.preview) {
    // No pointer in a card: the same table edits itself, which the grid shows live.
    let i = 0;
    stop = every(700, () => {
      i += 1;
      void table.update([{ 'Order ID': 10000 + (i % 12), Quantity: 1 + (i % 9) }]);
    });
  } else {
    select(bar!, 'edit_mode', MODES, (edit_mode) => {
      void viewer.restore({ plugin_config: { edit_mode } });
      out!.log(`edit_mode = ${edit_mode}`);
    });
    out!.log('EDIT: double-click a cell, type, press Enter. SELECT_*: click rows, columns or regions.');
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    viewer.removeEventListener('perspective-select', onSelect);
    // Our own View must go before the table, which teardown deletes after the viewer.
    void view.delete().finally(dispose);
  };
};

export default mount;
