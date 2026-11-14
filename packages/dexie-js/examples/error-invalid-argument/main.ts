// InvalidArgumentError: Dexie calls that were handed something they cannot use
import type { Mount } from '@/types.ts';
import { demo, friends, ID_COL } from '../../shared/demo.ts';
import { errorOf, showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(2), columns: [ID_COL, 'name'] });
  const { stage, db, t, out } = d;
  d.say.set('Three calls with arguments that make no sense.');
  const bad = (label: string, text: string, code: string, fn: () => unknown) =>
    d.step(label, text, code, async () => showError(out, await errorOf(fn)), 2700);
  d.run([
    bad('A made-up mode', 'Transactions are "r" or "rw".', "db.transaction('x', t, fn)", () => db.transaction('x' as 'r', t, () => undefined)),
    bad('Keys with a key path', 'This table has its ids inside the rows.', 't.bulkAdd(rows, [10, 11])', () =>
      t.bulkAdd([{ id: 10, name: 'A' }, { id: 11, name: 'B' }], [10, 11])),
    bad('update() without an id', 'Which row? The object has no id.', "t.update({ name: 'Per' }, { age: 1 })", () =>
      t.update({ name: 'Per' }, { age: 1 })),
  ]);
  return stage.dispose;
};

export default mount;
