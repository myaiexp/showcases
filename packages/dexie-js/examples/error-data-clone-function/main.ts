// DataCloneError: a function cannot be stored, but dates and arrays can
import type { Mount } from '@/types.ts';
import { attempt, demo, friends, ID_COL } from '../../shared/demo.ts';
import { showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(2), columns: [ID_COL, 'name'] });
  const { stage, t, out } = d;
  d.say.set('What can a row hold?', 't.add(row)');
  d.run([
    d.step('Dates and arrays', 'These can be copied into the database.', "t.add({ id: 3, joined: new Date(), tags: [...] })", async () => {
      await t.add({ id: 3, name: 'Sara', joined: new Date(), tags: ['a', 'b'] });
      out.value('saved', 'a Date and an array are fine');
    }),
    d.step('A function', 'A function cannot be copied: refused.', "t.add({ id: 4, greet: () => 'hi' })", async () => {
      const r = await attempt(t.add({ id: 4, name: 'Zed', greet: () => 'hi' }));
      showError(out, r.error);
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
