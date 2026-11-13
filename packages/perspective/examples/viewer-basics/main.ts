// load() a Client, then restore() picks the table and the initial query in one render
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  // viewer.md: always give a Table a name, so restore() and save() tokens can refer to it.
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });

  const viewer = createViewer(el, ctx);
  // load() binds the viewer to a Client and renders nothing yet; restore() selects the
  // table and the configuration, so the pair renders exactly once.
  await viewer.load(client);
  await viewer.restore({
    table: name,
    plugin: 'Datagrid',
    group_by: ['Region'],
    columns: ['Sales', 'Profit', 'Quantity'],
    // The settings sidebar is where a reader drags columns into group_by, split_by,
    // sort and filter; it stays closed in a card.
    settings: !ctx.preview,
  });

  // A card has no pointer input, so it regroups the same table on a timer instead.
  const stop = ctx.preview
    ? cycle(viewer, [{ group_by: ['Region'] }, { group_by: ['Category'] }, { group_by: ['Segment', 'Ship Mode'] }])
    : () => {};

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
