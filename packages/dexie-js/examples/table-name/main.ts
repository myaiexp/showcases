// Table.name: the name of the object store a table stands for
import type { Mount } from '@/types.ts';
import { demo, friends, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', extra: { pets: 'id, name', books: 'id, title' }, label: 'names', side: 'result', columns: [ID_COL, 'name'], seed: friends(3) });
  const { stage, db, t, say, view, out } = d;
  say.set('A database with three tables.', "stores({ friends, pets, books })");
  d.run(
    ['friends', 'pets', 'books'].map((n) =>
      d.step(`db.${n}.name`, `Ask the ${n} table for its name.`, `db.${n}.name`, async () => {
        out.value(db.table(n).name, `db.${n}.name`);
      }),
    ),
  );

  return stage.dispose;
};

export default mount;
