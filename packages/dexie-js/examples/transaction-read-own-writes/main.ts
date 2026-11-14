// Inside a transaction a read right after unawaited writes already sees them
import type { Mount } from '@/types.ts';
import { FRIEND_COLS, friends } from '../../shared/demo.ts';
import { bank, settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx, { table: 'friends', stores: 'id, name, age', seed: friends(2), columns: FRIEND_COLS });
  const { stage, db, t, log } = d;
  d.say.set('Three new friends, then a read.');
  d.run([
    d.step('Write, then read', 'The read sees all three at once.', 'add() x3  // no await', async () => {
      log.clear();
      const p = db.transaction('rw', t, async () => {
        t.put({ id: 10, name: 'Mats', age: 40 });
        t.put({ id: 11, name: 'Nils', age: 41 });
        t.put({ id: 12, name: 'Jon', age: 42 });
        log.add('3 adds queued, not awaited');
        const rows = await t.where('age').above(39).toArray();
        log.add(`read inside: ${rows.map((r: { name: string }) => r.name).join(', ')}`, 'ok');
        log.add('grid has not changed yet', 'muted');
      });
      await settle(log, p, 'committed: now the grid shows them');
    }, 3000),
  ]);
  return stage.dispose;
};

export default mount;
