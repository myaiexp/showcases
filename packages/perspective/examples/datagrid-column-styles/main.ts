// Datagrid columns_config: bars, gradients, pulse and string series colours
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, select, output, every } from '../../shared/controls.ts';
import { STYLES } from './styles.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const feed = quoteStream(5, 24);
  const name = uniqueName('quotes');
  const table = await client.table(feed.next(24), { name, index: 'id' });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 420 });
  const out = ctx.preview ? null : output(el, 150);
  await viewer.load(client);

  // columns_config is keyed by column name. Which colour reader applies depends on the
  // column's type and its fg_mode / bg_mode (save_restore.md § Colors).
  const apply = async (label: string): Promise<void> => {
    const columns_config = STYLES[label]!;
    // An update merges column by column; null clears the previous preset first.
    await viewer.restore({ columns_config: null });
    await viewer.restore({ columns_config });
    out?.set(`columns_config = ${JSON.stringify(columns_config, null, 2)}`);
  };
  await viewer.restore({
    table: name,
    plugin: 'Datagrid',
    columns: ['symbol', 'client', 'price', 'chg', 'qty'],
    sort: [['id', 'asc']],
  });
  await apply('all together');

  // Live updates make the "pulse" background and the bars move.
  const stop = every(ctx.preview ? 500 : 300, () => void table.update(feed.next(3)));
  if (!ctx.preview) select(bar!, 'style', Object.keys(STYLES), (v) => void apply(v)).value = 'all together';

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
