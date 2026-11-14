// Table.filter(fn): rows for which your function returns true
import type { Mount } from '@/types.ts';
import { demo, friends, ID_COL } from '../../shared/demo.ts';
import { button, textField } from '../../shared/controls.ts';
import { FRIENDS_RICH } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
  stores: 'id, name',
  seed: FRIENDS_RICH.slice(0, 6).map((f, i) => ({ id: i + 1, name: f.name, shoeSize: f.shoeSize })),
  columns: [ID_COL, 'name', { field: 'shoeSize', label: 'shoe', width: '3.4em' }],
});
  const { stage, db, t, say, view, out } = d;
  const run = async (test: (f: { name: string; shoeSize: number }) => boolean): Promise<void> => {
    view.unmark();
    const rows = await t.filter(test).toArray();
    view.mark(rows.map((r: { id: number }) => r.id));
    out.list(rows.map((r: { name: string }) => r.name));
  };
  say.set('Shoe size is not an index.');
  d.run([
    d.step('Shoe size 8+', 'Your own test, on any field.', 'db.friends.filter(f => f.shoeSize >= 8)', () => run((f) => f.shoeSize >= 8)),
    d.step('Name has an "a"', 'Any test you can write.', 'db.friends.filter(f => /a/i.test(f.name))', () => run((f) => /a/i.test(f.name))),
  ]);
  if (!stage.preview) {
    const field = textField(stage, 'name contains', 'er', async (v) => {
      say.set(`Names containing "${v}".`, `db.friends.filter(f => f.name.includes("${v}"))`);
      await run((f) => f.name.toLowerCase().includes(v.toLowerCase()));
    });
    button(stage, 'filter', () => run((f) => f.name.toLowerCase().includes(field.value.toLowerCase())));
  }

  return stage.dispose;
};

export default mount;
