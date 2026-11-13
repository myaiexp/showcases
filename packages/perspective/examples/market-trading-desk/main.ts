// A blotter, an order book and candlesticks over one streaming table
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { every } from '../../shared/controls.ts';
import { orderFlow, ORDER_SCHEMA } from './orders.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  // market_data.md: a blotter is an indexed table. Each update() with a known id
  // replaces that row, and a partial row changes only the fields it names.
  const table = await client.table(ORDER_SCHEMA, { name, index: 'id' });
  const flow = orderFlow();
  await table.update(flow.seed(300));

  const viewer = createViewer(el, ctx, { height: 620 });
  await viewer.load(client);
  await viewer.restoreWorkspace({
    panels: {
      blotter: {
        table: name,
        title: 'Blotter',
        plugin: 'Datagrid',
        columns: ['id', 'symbol', 'side', 'price', 'qty', 'status', 'time'],
        sort: [['time', 'desc']],
      },
      // An order book is a pivot of the same table: group_by price, split_by side,
      // sum of quantity, filtered to open orders.
      book: {
        table: name,
        title: 'Order book',
        plugin: 'X Bar',
        group_by: ['price'],
        split_by: ['side'],
        columns: ['qty'],
        filter: [['status', '==', 'open']],
      },
      // Candlesticks group by a time bucket, with first/last/high/low over aliases of price.
      candles: {
        table: name,
        title: 'Candles (1 s)',
        plugin: 'Candlestick',
        group_by: ["bucket(\"time\", 's')"],
        columns: ['open', 'close', 'high', 'low'],
        expressions: {
          "bucket(\"time\", 's')": "bucket(\"time\", 's')",
          open: '"price"',
          close: '"price"',
          high: '"price"',
          low: '"price"',
        },
        aggregates: { open: 'first', close: 'last', high: 'high', low: 'low' },
      },
    },
    layout: {
      type: 'split-layout',
      orientation: 'vertical',
      sizes: [0.5, 0.5],
      children: [
        {
          type: 'split-layout',
          orientation: 'horizontal',
          sizes: [0.6, 0.4],
          children: [
            { type: 'tab-layout', tabs: ['blotter'] },
            { type: 'tab-layout', tabs: ['book'] },
          ],
        },
        { type: 'tab-layout', tabs: ['candles'] },
      ],
    },
  });

  // New orders, plus partial updates filling or cancelling earlier ones by id.
  const stop = every(ctx.preview ? 600 : 250, () => void table.update(flow.tick()));

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
