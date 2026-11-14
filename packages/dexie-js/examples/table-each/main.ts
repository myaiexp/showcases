// Table.each(fn): call a function once per row, in order
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(5), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  const visit = async (go: (fn: (f: { id: number; name: string }) => void) => Promise<void>): Promise<void> => {
    const seen: { id: number; name: string }[] = [];
    await go((f) => seen.push(f));
    for (let i = 0; i < seen.length; i++) {
      view.mark([seen[i]!.id]);
      out.list(seen.slice(0, i + 1).map((f) => f.name));
      await stage.wait(330);
    }
  };
  say.set('Five friends are stored.');
  d.run([
    d.step('By id', 'The function runs once per row, by id.', 'db.friends.each(f => ...)', () => visit((fn) => t.each(fn)), 600),
    d.step('By age', 'Start from orderBy() to visit by age.', "db.friends.orderBy('age').each(f => ...)", () => visit((fn) => t.orderBy('age').each(fn)), 600),
  ]);

  return stage.dispose;
};

export default mount;
