// Window columns over a live tick stream: range frames, rate and ema
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, select, output, every } from '../../shared/controls.ts';

interface Variant {
  aggregate: string;
  extra: Record<string, number>;
}
// windows.md: range frames lie within `range` of each row's order_by (ms for a datetime);
// rate needs a range frame; ema takes alpha in (0, 1].
const VARIANTS: Record<string, Variant> = {
  'avg, range 5s': { aggregate: 'avg', extra: { range: 5000 } },
  'avg, range 20s': { aggregate: 'avg', extra: { range: 20000 } },
  'max, range 5s': { aggregate: 'max', extra: { range: 5000 } },
  'rate, range 5s': { aggregate: 'rate', extra: { range: 5000 } },
  'ema, alpha 0.5': { aggregate: 'ema', extra: { alpha: 0.5 } },
  'ema, alpha 0.05': { aggregate: 'ema', extra: { alpha: 0.05 } },
};
const ALIAS = 'window';

const configFor = (key: string): ViewerConfigUpdate => {
  const v = VARIANTS[key]!;
  return {
    windows: { [ALIAS]: { column: 'price', aggregate: v.aggregate, partition_by: ['symbol'], order_by: ['lastUpdate', 'asc'], ...v.extra } },
    columns: ['price', ALIAS],
    filter: [['symbol', '==', 'AAPL']],
  };
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('quotes');
  const feed = quoteStream(11);
  // limit keeps the newest 600 rows, so the stream can run forever.
  const table = await client.table(feed.next(80), { name, limit: 600 });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 120);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Y Line', settings: false });

  const apply = async (key: string): Promise<void> => {
    const config = configFor(key);
    await viewer.restore(config);
    out?.set(JSON.stringify({ windows: config.windows }, null, 2));
  };
  if (bar) select(bar, 'window', Object.keys(VARIANTS), (v) => void apply(v));
  await apply('avg, range 5s');

  // Window columns update incrementally as rows arrive, including earlier rows in the frame.
  const stopFeed = every(400, () => void table.update(feed.next(12)));
  const stopCycle = ctx.preview ? cycle(viewer, ['avg, range 5s', 'ema, alpha 0.5', 'max, range 5s'].map(configFor), 3000) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stopFeed();
    stopCycle();
    dispose();
  };
};

export default mount;
