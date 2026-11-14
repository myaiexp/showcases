// DataError: a primary key must be a number, string, date, binary or array
import type { Mount } from '@/types.ts';
import { attempt, demo, friends, ID_COL } from '../../shared/demo.ts';
import { showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(2), columns: [ID_COL, 'name'] });
  const { stage, t, out } = d;
  d.say.set('Two rows. What counts as an id?', "stores: 'id, name'");
  const tryAdd = (label: string, text: string, code: string, row: object) =>
    d.step(label, text, code, async () => {
      const r = await attempt(t.add(row));
      showError(out, r.error);
    }, 2700);
  d.run([
    tryAdd('id: true', 'A boolean cannot be an id.', "t.add({ id: true, name: 'Bool' })", { id: true, name: 'Bool' }),
    tryAdd('id: an object', 'Nor can an object.', "t.add({ id: { n: 1 }, name: 'Obj' })", { id: { n: 1 }, name: 'Obj' }),
    tryAdd('id: null', 'Nor null.', "t.add({ id: null, name: 'Nul' })", { id: null, name: 'Nul' }),
  ]);
  return stage.dispose;
};

export default mount;
