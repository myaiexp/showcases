// A Table with limit: 12 overwrites its oldest rows once full
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const LIMIT = 12;

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const stream = quoteStream(5);
  let seq = 0;
  // Rows tagged with the order they arrived in, so the overwriting is visible.
  const batch = (n: number) => stream.next(n).map(({ symbol, price, qty }) => ({ seq: seq++, symbol, price, qty }));
  // options.md: `limit` cannot be combined with `index`.
  const table = s.own(await client.table(batch(8), { name: uniqueName('limited'), limit: LIMIT }));

  const viewer = createViewer(el, ctx, { height: 330 });
  await viewer.load(client);
  await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', settings: false });
  s.ownViewer(viewer);

  if (ctx.preview) {
    s.every(450, () => table.update(batch(2)));
    return s.dispose();
  }

  const out = output(el, 90);
  const report = async (what: string): Promise<void> => {
    out.set(`${what}\nget_limit(): ${await table.get_limit()}\nsize(): ${await table.size()}\nseq now runs from ${Math.max(0, seq - LIMIT)} to ${seq - 1}`);
  };
  const add = (n: number) => () => void table.update(batch(n)).then(() => report(`update() with ${n} row${n > 1 ? 's' : ''}`));
  const bar = controlBar(el);
  button(bar, 'Add 1 row', add(1));
  button(bar, 'Add 5 rows', add(5));
  button(bar, 'Add 30 rows', add(30));
  el.prepend(bar);
  await report(`Created with { limit: ${LIMIT} } from 8 rows.`);
  return s.dispose();
};

export default mount;
