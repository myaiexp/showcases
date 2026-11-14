// Table.offset(n) with limit(): skip rows to page through a table
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  const show = async (rows: { id: number; name: string }[]): Promise<void> => {
    view.mark(rows.map((r) => r.id));
    out.list(rows.map((r) => r.name));
  };
  const page = (p: number) =>
    d.step(`Page ${p}`, `Page ${p}: skip ${(p - 1) * 2}, take 2.`, `db.friends.offset(${(p - 1) * 2}).limit(2)`, async () =>
      show(await t.offset((p - 1) * 2).limit(2).toArray()),
    );
  say.set('Six friends are stored.');
  d.run([
    d.step('Skip 4', 'Skip the first four rows.', 'db.friends.offset(4).toArray()', async () => show(await t.offset(4).toArray())),
    page(1),
    page(2),
    page(3),
  ]);

  return stage.dispose;
};

export default mount;
