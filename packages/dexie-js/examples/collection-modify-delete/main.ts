// collection.modify(): delete this.value removes the row, like delete()
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, view, out } = d;
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    d.step('Find over 80', 'Who is over 80?', "where('age').above(80)", async () =>
      view.mark(await t.where('age').above(80).primaryKeys(), 'bad'),
    ),
    d.step('Delete inside', 'The function deletes its row.', 'modify(function () { delete this.value })', async () =>
      out.value(
        await t.where('age').above(80).modify(function (this: { value?: unknown }) {
          delete this.value;
        }),
        'rows removed',
        'warn',
      ),
    ),
    d.step('Same as delete()', 'delete() does the same.', "where('age').below(10).delete()", async () =>
      out.value(await t.where('age').below(10).delete(), 'rows removed', 'warn'),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
