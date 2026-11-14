// Table.bulkGet(keys): one answer per key, undefined for missing keys
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  const ask = (keys: number[], text: string) =>
    d.step(`bulkGet([${keys.join(', ')}])`, text, `db.friends.bulkGet([${keys.join(', ')}])`, async () => {
      const found = await t.bulkGet(keys);
      view.mark(keys.filter((k, i) => found[i]));
      out.list(found.map((f: { name: string } | undefined) => (f ? f.name : 'undefined')));
    });
  say.set('Four friends are stored.');
  d.run([
    ask([1, 777, 2], 'Key 777 does not exist: undefined.'),
    ask([4, 1, 4], 'Answers follow your order, repeats too.'),
  ]);

  return stage.dispose;
};

export default mount;
