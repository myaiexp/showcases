// collection.delete(): remove what a query finds and report how many
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, view, out } = d;
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    d.step('Find under 30', 'Which friends are under 30?', "where('age').below(30)", async () =>
      view.mark(await t.where('age').below(30).primaryKeys(), 'bad'),
    ),
    d.step('Delete them', 'Delete them. Count returned.', "where('age').below(30).delete()", async () =>
      out.value(await t.where('age').below(30).delete(), 'deleted', 'warn'),
    ),
    d.step('Delete over 80', 'Delete the over-80s too.', "where('age').above(80).delete()", async () =>
      out.value(await t.where('age').above(80).delete(), 'deleted', 'warn'),
    ),
    d.step('Nothing left', 'No one over 90 left: zero.', "where('age').above(90).delete()", async () =>
      out.value(await t.where('age').above(90).delete(), 'deleted'),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
