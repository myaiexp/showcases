// A primary key without ++: you supply it, and a missing or repeated one is refused
import type { Mount } from '@/types.ts';
import { attempt, demo, friends, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(2), columns: [ID_COL, 'name'] });
  const { stage, t, say, out } = d;
  say.set('The key is yours to choose.', "stores({ friends: 'id, name' })");
  const show = (error?: Error): void => {
    if (error) out.value(error.name, error.message.slice(0, 60), 'bad');
  };
  d.run([
    d.step('Add with an id', 'Give the id yourself.', "db.friends.add({ id: 7, name: 'Sara' })", async () => {
      out.value(await t.add({ id: 7, name: 'Sara' }), 'stored under your key');
    }),
    d.step('Add without an id', 'No ++, so nobody numbers the row.', "db.friends.add({ name: 'Simon' })", async () => {
      show((await attempt(t.add({ name: 'Simon' }))).error);
    }),
    d.step('Reuse an id', 'Keys are unique: id 1 is taken.', "db.friends.add({ id: 1, name: 'Kate' })", async () => {
      show((await attempt(t.add({ id: 1, name: 'Kate' }))).error);
    }),
  ]);
  return stage.dispose;
};

export default mount;
