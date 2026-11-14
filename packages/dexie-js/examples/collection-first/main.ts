// collection.first(): the first row of a collection, or undefined
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, view, out } = d;
  const first = (label: string, text: string, code: string, make: () => ReturnType<typeof t.toCollection>) =>
    d.step(label, text, code, async () => {
      const row = await make().first();
      if (row) {
        view.mark([row.id]);
        out.value(row.name, `age ${row.age}`);
      } else out.value(undefined, 'nobody found', 'warn');
    });
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    first('Youngest', 'The youngest friend.', "orderBy('age').first()", () => t.orderBy('age')),
    first('First over 60', 'Youngest of the over-60s.', "where('age').above(60).first()", () => t.where('age').above(60)),
    first('Nobody', 'Nobody is over 120.', "where('age').above(120).first()", () => t.where('age').above(120)),
  ]);
  return d.stage.dispose;
};

export default mount;
