// Table.mapToClass(Class): rows read from the table get your class's methods
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', extra: { plain: 'id, name, age' }, label: 'mapped', view: { title: 'friends (mapped)' }, seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  class Friend {
    declare name: string;
    greet(): string {
      return `Hi, I am ${this.name}!`;
    }
  }
  t.mapToClass(Friend);
  say.set('Two tables hold the same four friends.', 'db.friends.mapToClass(Friend)');
  d.run(
    [
      d.step('Read plain', "A plain table: no methods.", "db.plain.get(1)", async () => {
        const f = await db.table('plain').get(1);
        out.list([`instanceof Friend: ${f instanceof Friend}`, `greet is ${typeof f.greet}`], 'warn');
      }),
      d.step('Read mapped', 'The mapped table gives Friends.', 'db.friends.get(1)', async () => {
        const f = await t.get(1);
        view.mark([1]);
        out.list([`instanceof Friend: ${f instanceof Friend}`, f.greet()]);
      }),
    ],
    {
      setup: async () => {
        await d.reseed();
        await db.table('plain').bulkPut(friends(4));
      },
    },
  );

  return stage.dispose;
};

export default mount;
