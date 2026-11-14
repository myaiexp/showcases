// catch() can take an error class or an error name, so one handler only takes its own error
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS });
  const { stage, t, out } = d;
  d.say.set('Who gets to handle which error?');
  d.run([
    d.step('By class', 'A class: only that error is caught.', 'catch(Dexie.ConstraintError, fn)', async () => {
      const msg = await t.add({ id: 2, name: 'Twin', age: 1 }).catch(Dexie.ConstraintError, () => 'duplicate id: handled');
      out.value(msg, 'caught by class', 'warn');
    }),
    d.step('By name', 'A name string works too.', "catch('ConstraintError', fn)", async () => {
      const msg = await t.add({ id: 2, name: 'Twin', age: 1 }).catch('ConstraintError', () => 'duplicate id: handled');
      out.value(msg, 'caught by name', 'warn');
    }),
    d.step('Another error', 'Not its kind: it falls through.', 'catch(Dexie.ConstraintError).catch(fn)', async () => {
      const msg = await t
        .put({ id: 9, name: 'Zed', age: 30 })
        .then(() => {
          throw new RangeError('too young');
        })
        .catch(Dexie.ConstraintError, () => 'wrong handler')
        .catch((e: Error) => `generic catch: ${e.message}`);
      out.value(msg, 'skipped the class handler', 'bad');
    }),
  ]);
  return stage.dispose;
};

export default mount;
