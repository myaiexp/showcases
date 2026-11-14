// Table.get(key): fetch one row, or undefined when it is missing
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { button, numberField } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  const lookup = async (id: number): Promise<void> => {
    view.unmark();
    const f = await t.get(id);
    say.set(f ? 'Found: the row comes back.' : 'No such row: undefined.', `db.friends.get(${id})`);
    if (f) {
      view.mark([id]);
      out.value(f.name, `age ${f.age}`);
    } else out.value(undefined, 'not an error', 'warn');
  };
  say.set('Look a friend up by id.', 'db.friends.get(2)');
  d.run([
    { label: 'get(2)', run: () => lookup(2) },
    { label: 'get(99)', run: () => lookup(99) },
  ]);
  if (!stage.preview) {
    const n = numberField(stage, 'id', 3);
    button(stage, 'get(id)', () => lookup(Number(n.value)));
  }

  return stage.dispose;
};

export default mount;
