// perspective-click: the clicked cell's filters drive a second viewer
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders, REGIONS } from '../../shared/data.ts';
import { output, every } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });

  const row = document.createElement('div');
  Object.assign(row.style, { display: 'flex', gap: '8px', width: '100%' });
  el.append(row);
  const summary = createViewer(el, ctx, { parent: row, height: 380 });
  const detail = createViewer(el, ctx, { parent: row, height: 380 });
  summary.style.flex = detail.style.flex = '1 1 0';
  const out = ctx.preview ? null : output(el, 120);

  await summary.load(client);
  await detail.load(client);
  await summary.restore({ table: name, plugin: 'Datagrid', group_by: ['Region', 'Category'], columns: ['Sales', 'Profit'] });
  await detail.restore({ table: name, plugin: 'Datagrid', columns: ['Order ID', 'Region', 'Category', 'Sales'], sort: [['Sales', 'desc']] });

  // events.md § Click events: detail.config carries the filters that select the clicked
  // cell's rows, ready for restore(); row and column_names describe the cell itself.
  const onClick = (event: Event): void => {
    const { config, row: clicked, column_names } = (event as CustomEvent).detail;
    out?.log(`perspective-click → config ${JSON.stringify(config)}, columns ${JSON.stringify(column_names)}, row ${JSON.stringify(clicked)}`);
    void detail.restore({ filter: config.filter ?? [] });
  };
  summary.addEventListener('perspective-click', onClick);

  let stop = (): void => {};
  if (ctx.preview) {
    // No clicks in a card: apply the filter a click on each region would produce.
    let i = 0;
    stop = every(2200, () => void detail.restore({ filter: [['Region', '==', REGIONS[i++ % REGIONS.length]!]] }));
  } else {
    out!.log('Click a cell or a group header on the left; the right viewer restores the filters from the event.');
  }

  const dispose = teardown([summary, detail], [table]);
  return () => {
    stop();
    summary.removeEventListener('perspective-click', onClick);
    dispose();
  };
};

export default mount;
