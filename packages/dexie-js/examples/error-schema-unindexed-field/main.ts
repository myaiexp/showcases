// SchemaError: where() needs an index; filter() does not
import type { Mount } from '@/types.ts';
import { demo, FRIEND_COLS, friends } from '../../shared/demo.ts';
import { errorOf, showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(4), columns: FRIEND_COLS });
  const { stage, t, view, out } = d;
  d.say.set('Only name is indexed. Age is not.', "stores: 'id, name'");
  d.run([
    d.step('where() on age', 'No index on age: the query is refused.', "t.where('age').above(40).toArray()", async () => {
      showError(out, await errorOf(() => t.where('age').above(40).toArray()));
    }, 2800),
    d.step('filter() on age', 'filter() reads every row, index or not.', 't.filter(f => f.age > 40).toArray()', async () => {
      const rows = await t.filter((f: { age: number }) => f.age > 40).toArray();
      view.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => r.name));
    }, 2400),
  ]);
  return stage.dispose;
};

export default mount;
