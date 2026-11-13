// A million rows from one repeated Arrow batch, then pivoted live
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { columnarBatch } from './batch.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 460 });
  const out = output(el, ctx.preview ? 40 : 90);
  const t0 = performance.now();

  // large_datasets.md: Arrow loads straight into the engine's columnar buffers, and
  // View.to_arrow() exports the same way. So: one 50,000-row columnar batch becomes a
  // staging table, its Arrow export is the batch, and the real table appends it.
  const staging = await client.table(columnarBatch(50_000));
  const stagingView = await staging.view();
  const arrow = await stagingView.to_arrow();
  await stagingView.delete();
  await staging.delete();

  const name = uniqueName('trips');
  const table = await client.table(arrow, { name });
  const target = ctx.preview ? 100_000 : 1_000_000;
  // Count batches rather than polling size(), which can trail the last awaited update().
  // A card can be scrolled away mid-load, so appending also stops once the host unmounts it.
  for (let loaded = 50_000; loaded < target && !ctx.signal.aborted; loaded += 50_000) await table.update(arrow);
  const rows = await table.size();
  const msLoad = performance.now() - t0;
  out.set(`${rows.toLocaleString()} rows from a ${(arrow.byteLength / 1e6).toFixed(1)} MB Arrow batch, loaded in ${msLoad.toFixed(0)} ms`);

  await viewer.load(client);
  // Grouping, sorting and filtering run inside the engine; the grid asks only for the
  // rows it is about to draw.
  await viewer.restore({ table: name, plugin: 'Datagrid', group_by: ['zone'], split_by: ['vendor'], columns: ['fare'] });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = cycle(viewer, [{ group_by: ['zone'] }, { group_by: ['vendor', 'payment'] }, { group_by: [], sort: [['fare', 'desc']] }]);
  } else {
    const time = async (label: string, update: Parameters<typeof viewer.restore>[0]): Promise<void> => {
      const t = performance.now();
      await viewer.restore(update);
      await viewer.flush();
      out.log(`${label}: ${(performance.now() - t).toFixed(0)} ms over ${rows.toLocaleString()} rows`);
    };
    button(bar!, 'flat, sorted by fare', () => void time('sort', { group_by: [], split_by: [], sort: [['fare', 'desc']] }));
    button(bar!, 'group by zone × vendor', () => void time('pivot', { group_by: ['zone'], split_by: ['vendor'], sort: [] }));
    button(bar!, 'filter fare > 90', () => void time('filter', { filter: [['fare', '>', 90]] }));
    button(bar!, 'X/Y Scatter, distance × fare', () =>
      void time('scatter', { plugin: 'X/Y Scatter', group_by: [], split_by: [], columns: ['distance', 'fare'], filter: [] }),
    );
    button(bar!, 'Datagrid', () => void time('grid', { plugin: 'Datagrid', columns: ['fare', 'distance', 'zone', 'vendor'] }));
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
