// Table.defineClass(structure): a constructor whose prototype rows inherit
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  type Person = { prototype: Record<string, unknown>; new (): object };
  const Friend = (t as unknown as { defineClass(shape: object): Person }).defineClass({ name: String, age: Number });
  Friend.prototype.describe = function (this: { name: string; age: number }) {
    return `${this.name} is ${this.age}`;
  };
  say.set('Four friends are stored.', 'const Friend = db.friends.defineClass({...})');
  d.run([
    d.step('Call a method', 'Rows have a method never stored.', 'friend.describe()', async () => {
      const f = await t.get(2);
      view.mark([2]);
      out.value(f.describe(), 'built by the method', 'ok');
    }),
    d.step('Is it a Friend?', 'Every row read is an instance.', 'friend instanceof Friend', async () => {
      const f = await t.get(3);
      view.mark([3]);
      out.value(String(f instanceof Friend), 'instanceof Friend');
    }),
    d.step('Every row', 'The method works on all of them.', 'db.friends.each(f => f.describe())', async () => {
      const lines: string[] = [];
      await t.each((f: { describe(): string }) => lines.push(f.describe()));
      out.list(lines);
    }),
  ]);

  return stage.dispose;
};

export default mount;
