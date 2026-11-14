// hook('deleting') writes an audit row for every delete, in the same transaction
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { attempt, demo, friends, ID_COL } from '../../shared/demo.ts';
import { showError, sideGrid } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: 'id, name',
    extra: { audit: '++id' },
    seed: friends(4),
    columns: [ID_COL, 'name'],
    side: 'log',
    weights: [1, 1],
  });
  const { stage, db, t, out } = d;
  const audit = db.table('audit');
  sideGrid(d, audit, [{ field: 'id', width: '2.2em' }, 'text'], 'audit');
  // The transaction passed in is the one doing the delete, so the audit row lives or dies with it.
  t.hook('deleting', (_primKey, obj, trans) => {
    void trans.table('audit').add({ text: `deleted ${obj.name}` });
  });
  if (!stage.preview) button(stage, 'Clear audit', () => audit.clear());
  d.say.set('Four friends, an empty audit log.', "hook('deleting', (key, obj, trans) => trans.table('audit').add(...))");
  d.run([
    d.step('Delete one', 'The hook logs who was deleted.', "db.transaction('rw', t, audit, () => t.delete(2))", async () => {
      await audit.clear();
      await db.transaction('rw', t, audit, () => t.delete(2));
    }),
    d.step('Delete two at once', 'Two deletes, two audit rows.', 'bulkDelete([1, 3])', async () => {
      await db.transaction('rw', t, audit, () => t.bulkDelete([1, 3]));
    }),
    d.step('Forget the audit table', 'The hook cannot reach it: delete refused.', "db.transaction('rw', t, () => t.delete(4))", async () => {
      const r = await attempt(db.transaction('rw', t, () => t.delete(4)));
      showError(out, r.error);
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
