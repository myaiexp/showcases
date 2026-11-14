// collection.eachPrimaryKey(): visit row ids in the order of an index
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { walk } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, out } = d;
  const visit = (label: string, text: string, code: string, make: () => ReturnType<typeof t.toCollection>) =>
    d.step(label, text, code, async () => {
      const ids: unknown[] = [];
      await make().eachPrimaryKey((id) => ids.push(id));
      out.list(ids.map((id) => `id ${id}`));
      await walk(d, ids);
    });
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    visit('By name', 'Ids in name order.', "orderBy('name').eachPrimaryKey(id => ...)", () => t.orderBy('name')),
    visit('By age', 'Ids in age order.', "orderBy('age').eachPrimaryKey(id => ...)", () => t.orderBy('age')),
    visit('Over 30', 'Ids of the over-30s, by age.', "where('age').above(30).eachPrimaryKey", () => t.where('age').above(30)),
  ]);
  return d.stage.dispose;
};

export default mount;
