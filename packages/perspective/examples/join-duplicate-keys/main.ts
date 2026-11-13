// Duplicate join keys multiply rows; joined tables are read-only
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const initialLeft = [{ k: 1, a: 'x' }, { k: 1, a: 'y' }, { k: 2, a: 'z' }];
  const initialRight = [{ k: 1, b: 10 }, { k: 1, b: 20 }, { k: 1, b: 30 }, { k: 2, b: 40 }];
  // reactivity.md: unindexed tables append, so duplicate keys accumulate and the join is a
  // cross product per key (left count x right count). Indexed tables keep one row per key.
  const plainL = s.own(await client.table(initialLeft, { name: uniqueName('plain_left') }));
  const plainR = s.own(await client.table(initialRight, { name: uniqueName('plain_right') }));
  const keyedL = s.own(await client.table(initialLeft.slice(1), { name: uniqueName('keyed_left'), index: 'k' }));
  const keyedR = s.own(await client.table(initialRight.slice(2), { name: uniqueName('keyed_right'), index: 'k' }));
  const plain = s.own(await client.join(plainL, plainR, 'k', { name: uniqueName('plain_join') }));
  const keyed = s.own(await client.join(keyedL, keyedR, 'k', { name: uniqueName('keyed_join') }));

  const holder = document.createElement('div');
  Object.assign(holder.style, { display: 'flex', flexDirection: ctx.preview ? 'column' : 'row', gap: '8px', width: '100%' });
  el.append(holder);
  for (const t of [plain, keyed]) {
    const viewer = createViewer(el, ctx, { height: 250, previewHeight: 96, parent: holder });
    await viewer.load(client);
    await viewer.restore({ table: await t.get_name(), plugin: 'Datagrid', settings: false });
    s.ownViewer(viewer);
  }

  let n = 0;
  const addDuplicates = async (): Promise<void> => {
    n += 1;
    await Promise.all([
      plainL.update([{ k: 1, a: `dup${n}` }]),
      plainR.update([{ k: 1, b: 100 + n }]),
      keyedL.update([{ k: 1, a: `dup${n}` }]),
      keyedR.update([{ k: 1, b: 100 + n }]),
    ]);
  };
  const reset = async (): Promise<void> => {
    n = 0;
    await Promise.all([plainL.replace(initialLeft), plainR.replace(initialRight), keyedL.replace(initialLeft.slice(1)), keyedR.replace(initialRight.slice(2))]);
  };

  if (ctx.preview) {
    s.every(1100, async () => (n >= 4 ? reset() : addDuplicates()));
    return s.dispose();
  }

  const out = output(el, 170);
  const report = async (what: string): Promise<void> => {
    out.set(`${what}\nunindexed join: ${await plain.size()} rows (${await plainL.size()} left x ${await plainR.size()} right sources)\nindexed join:   ${await keyed.size()} rows (${await keyedL.size()} left, ${await keyedR.size()} right sources)`);
  };
  const attempt = (label: string, op: () => Promise<unknown>) => () => {
    op().then(() => out.set(`${label}: accepted?`)).catch((e: unknown) => out.set(`${label}\nrejected: ${String(e)}`));
  };
  const bar = controlBar(el);
  button(bar, 'Add a key-1 row to both sides', () => void addDuplicates().then(() => report('update() with key 1 on both sources')));
  button(bar, 'Reset', () => void reset().then(() => report('replace() on all four sources')));
  // Read-only: a joined Table refuses writes.
  button(bar, 'joined.update()', attempt('plain_join.update()', () => plain.update([{ k: 9, a: 'q', b: 1 }])));
  // Column Name Conflicts: a non-key column may not appear on both sides.
  button(bar, 'Join with a shared column', attempt('join of two tables that both have column "a"', async () => {
    const t = await client.table([{ k: 1, a: 'clash' }]);
    try {
      await (await client.join(plainL, t, 'k')).delete();
    } finally {
      await t.delete();
    }
  }));
  el.prepend(bar);
  // Source Table Deletion: a source cannot be deleted while a join reads it, so cleanup deletes
  // the joins first. (Not offered as a button: in v5.9.1 a refused delete() leaves that table
  // undeletable afterwards, so trying it would leak a table.)
  await report('Left grid: unindexed sources. Right grid: the same rows with index "k".');
  return s.dispose();
};

export default mount;
