// collection.each(): call a function for every row, in order
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { walk } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, out } = d;
  const visit = (label: string, text: string, code: string, make: () => ReturnType<typeof t.toCollection>) =>
    d.step(label, text, code, async () => {
      const names: string[] = [];
      const ids: unknown[] = [];
      await make().each((friend) => {
        names.push(`${friend.name} ${friend.age}`);
        ids.push(friend.id);
      });
      out.list(names);
      await walk(d, ids);
    });
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    visit('By id', 'Visit everyone, by id.', 'db.friends.each(f => ...)', () => t.toCollection()),
    visit('By age', 'Visit everyone, by age.', "orderBy('age').each(f => ...)", () => t.orderBy('age')),
    visit('Over 30', 'Visit only the over-30s.', "where('age').above(30).each(...)", () => t.where('age').above(30)),
  ]);
  return d.stage.dispose;
};

export default mount;
