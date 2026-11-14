// The global Promise is safe inside a transaction: Promise.all and native thens keep the zone
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS, side: 'log' });
  const { stage, db, t, log } = d;
  d.say.set('Plain window.Promise inside a transaction.');
  d.run([
    d.step('Promise.all + then', 'Native promises stay in the transaction.', 'Promise.all([get(1), get(2)])', async () => {
      log.clear();
      const p = db.transaction('r', t, async () => {
        const [a, b] = await Promise.all([t.get(1), t.get(2)]);
        log.add(`Promise.all read ${a.name} and ${b.name}`);
        await Promise.resolve().then(() => log.add(`native then: ${Dexie.currentTransaction ? 'in the transaction' : 'outside'}`, 'ok'));
        log.add(`still reading: ${await t.count()} friends`);
      });
      await settle(log, p, 'finished');
    }, 2800),
    d.step('Promise.all, one fails', 'One fails in Promise.all: all undone.', 'Promise.all([put, add(taken)])', async () => {
      log.clear();
      const p = db.transaction('rw', t, () =>
        Promise.all([t.put({ id: 8, name: 'Hedda', age: 66 }), t.add({ id: 2, name: 'Twin', age: 1 })]),
      );
      await settle(log, p);
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
