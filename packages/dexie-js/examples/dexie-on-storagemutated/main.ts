// Dexie.on('storagemutated'): which parts each write touched
import Dexie, { type ObservabilitySet } from 'dexie';
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { label: 'mutated', stores: '++id, name, age', seed: friends(3), columns: FRIEND_COLS, side: 'log' });
  const { stage, db, t, log } = d;
  const mine = `idb://${db.name}/`;

  // Page-wide: every card hears every write, so keep only parts of our own database.
  const listener = (parts: ObservabilitySet): void => {
    const own = Object.keys(parts).filter((k) => k.startsWith(mine));
    if (!own.length) return;
    const parsed = own.map((k) => k.slice(mine.length).split('/'));
    const tables = [...new Set(parsed.map(([table]) => table))];
    const kinds = [...new Set(parsed.map(([, index]) => (index === '' ? 'keys' : index === ':dels' ? 'deleted keys' : index)))];
    log.add(`${tables.join(', ')}: ${kinds.join(', ')}`, 'warn');
  };
  const event = Dexie.on('storagemutated');
  event.subscribe(listener);
  stage.onDispose(() => event.unsubscribe(listener));

  d.say.set('Listen to every write.', "Dexie.on('storagemutated').subscribe(fn)");
  d.run([
    d.step('Add a friend', 'A new row touches keys and all indexes.', "db.friends.add({ name: 'Sara', age: 40 })", async () => {
      log.clear();
      await t.add({ name: 'Sara', age: 40 });
      await stage.wait(200);
    }),
    d.step('Change an age', 'Only the age index is named.', 'db.friends.update(1, { age: 22 })', async () => {
      log.clear();
      await t.update(1, { age: 22 });
      await stage.wait(200);
    }),
    d.step('Delete one', 'Deleted keys are reported too.', 'db.friends.delete(2)', async () => {
      log.clear();
      await t.delete(2);
      await stage.wait(200);
    }),
  ]);
  return stage.dispose;
};

export default mount;
