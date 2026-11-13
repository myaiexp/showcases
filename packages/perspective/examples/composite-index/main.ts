// A composite index: rows keyed by (symbol, client)
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const COLUMNS = ['symbol', 'client', 'price', 'qty', 'chg'];

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const stream = quoteStream(11, 1000);
  // options.md: a list of column names keys each row by the combination, in list order.
  const table = s.own(
    await client.table(stream.next(30), { name: uniqueName('composite'), index: ['symbol', 'client'] }),
  );

  const viewer = createViewer(el, ctx, { height: 330 });
  await viewer.load(client);
  await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', columns: COLUMNS, settings: false });
  s.ownViewer(viewer);

  if (ctx.preview) {
    // Rows with an existing (symbol, client) pair replace it; new pairs are added.
    s.every(500, () => table.update(stream.next(2)));
    return s.dispose();
  }

  const out = output(el, 120);
  const report = async (what: string): Promise<void> => {
    out.set(`${what}\nget_index(): ${show(await table.get_index())}\nsize(): ${await table.size()} (at most 8 symbols x 5 clients = 40)`);
  };
  const run = (what: string, op: () => Promise<void>) => () => void op().then(() => report(what));
  const bar = controlBar(el);
  button(bar, 'Update AAPL / Elo', run('update() of one (AAPL, Elo) row with price 1', () => table.update([{ symbol: 'AAPL', client: 'Elo', price: 1 }])));
  button(bar, 'Add 5 random rows', run('update() of 5 rows: matching keys replaced, new keys added', () => table.update(stream.next(5))));
  button(bar, 'Remove AAPL / Elo', run('remove([["AAPL", "Elo"]]): one key is a list of index values', () => table.remove([['AAPL', 'Elo']])));
  // An update which leaves out an index column is rejected.
  button(bar, 'Update without client', () => {
    table
      .update([{ symbol: 'AAPL', price: 2 }])
      .then(() => report('accepted?'))
      .catch((e: unknown) => out.set(`Rejected, as the docs say: ${String(e)}`));
  });
  el.prepend(bar);
  await report('Created with { index: ["symbol", "client"] }.');
  return s.dispose();
};

export default mount;
