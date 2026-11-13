// Candlestick and OHLC: a tick stream aggregated to open, close, high, low
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { controlBar, select, output, every } from '../../shared/controls.ts';
import { tickFeed } from './ticks.ts';

/**
 * The financial charts read the columns in the order Open, Close, High, Low, Tooltip, with
 * group_by as the X axis. Each slot here is an expression over the same price, and the
 * aggregates (grouping_and_pivots.md) pick the first, last, highest and lowest tick per bucket.
 */
const configFor = (plugin: string, bucket: string): ViewerConfigUpdate => ({
  plugin,
  expressions: {
    Open: '"price"',
    Close: '"price"',
    High: '"price"',
    Low: '"price"',
    Bucket: `bucket("time", '${bucket}')`,
  },
  group_by: ['Bucket'],
  columns: ['Open', 'Close', 'High', 'Low'],
  aggregates: { Open: 'first', Close: 'last by index', High: 'max', Low: 'min' },
  sort: [['Bucket', 'asc']],
});

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('ticks');
  const feed = tickFeed();
  // limit keeps the newest rows, so the stream can run forever.
  const table = await client.table(feed.next(300), { name, limit: 1500 });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 420 });
  const out = ctx.preview ? null : output(el, 130);
  await viewer.load(client);

  let plugin = 'Candlestick';
  let bucket = 'm';
  await viewer.restore({ table: name, settings: false, ...configFor(plugin, bucket) });
  const apply = async (): Promise<void> => {
    const config = configFor(plugin, bucket);
    await viewer.restore(config);
    out?.set(JSON.stringify({ plugin, aggregates: config.aggregates, group_by: config.group_by, bucket }, null, 2));
  };
  if (bar) {
    select(bar, 'plugin', ['Candlestick', 'OHLC'], (v) => ((plugin = v), void apply()));
    select(bar, 'bucket', ['s', 'm', 'h'], (v) => ((bucket = v), void apply())).value = bucket;
  }
  await apply();

  // 15 simulated ticks = one simulated minute per timer step.
  const stopFeed = every(500, () => void table.update(feed.next(15)));
  const stopCycle = ctx.preview ? cycle(viewer, [configFor('OHLC', 'm'), configFor('Candlestick', 'm')], 5000) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stopFeed();
    stopCycle();
    dispose();
  };
};

export default mount;
