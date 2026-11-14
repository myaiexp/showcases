// InvalidTableError: asking for a table the schema does not have
import type { Mount } from '@/types.ts';
import { demo, friends, ID_COL } from '../../shared/demo.ts';
import { errorOf, showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(2), columns: [ID_COL, 'name'] });
  const { stage, db, out } = d;
  d.say.set('The schema declares one table: friends.', "stores: { friends: 'id, name' }");
  d.run([
    d.step('Ask for friends', 'It exists, so you get it.', "db.table('friends')", () => {
      out.value(db.table('friends').name, 'a table object');
    }, 1700),
    d.step('Ask for pets', 'No such table: an error right away.', "db.table('pets')", async () => {
      showError(out, await errorOf(() => db.table('pets')));
    }, 2700),
    d.step('List the real tables', 'db.tables lists what exists.', 'db.tables.map(t => t.name)', () => {
      out.list(db.tables.map((t) => t.name));
    }, 1700),
  ]);
  return stage.dispose;
};

export default mount;
