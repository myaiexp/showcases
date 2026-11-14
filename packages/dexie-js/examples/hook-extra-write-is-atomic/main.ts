// A hook's extra write shares the caller's transaction: saved or undone together
import type { Mount } from '@/types.ts';
import { attempt, demo, ID_COL } from '../../shared/demo.ts';
import { sideGrid } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: '++id, name',
    extra: { activity: '++id' },
    columns: [ID_COL, 'name'],
    side: 'log',
    weights: [1, 1],
  });
  const { stage, db, t } = d;
  const activity = db.table('activity');
  sideGrid(d, activity, [{ field: 'id', width: '2.2em' }, 'text'], 'activity');
  t.hook('creating', (_primKey, obj, trans) => {
    void trans.table('activity').add({ text: `added ${obj.name}` });
  });
  d.say.set('Adding a friend also logs an activity row.', "hook('creating', (key, obj, trans) => ...)");
  d.run([
    d.step('Add and save', 'Both rows are saved together.', "db.transaction('rw', t, activity, () => t.add(...))", async () => {
      await activity.clear();
      await db.transaction('rw', t, activity, () => t.add({ name: 'Sara' }));
    }),
    d.step('Add, then change your mind', 'The transaction fails: both are undone.', "throw new Error('changed my mind')", async () => {
      await attempt(
        db.transaction('rw', t, activity, async () => {
          await t.add({ name: 'Per' });
          throw new Error('changed my mind');
        }),
      );
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
