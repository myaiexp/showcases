// UpgradeError: a primary key cannot change, and nothing is lost
import type { Mount } from '@/types.ts';
import { tryIt, versionDemo } from '../../shared/era.ts';
import { showError } from '../../shared/hook-kit.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'upgrade', title: 'what happened' });
  const { lab, out } = d;
  const v1 = (x: Parameters<Parameters<typeof lab.open>[0]>[0]): void => void x.version(1).stores({ friends: '++id, name' });
  d.say.set('Two friends are stored at version 1.', "version(1).stores({ friends: '++id, name' })");
  d.run([
    d.step('Version 1', 'Two friends, key is an auto number.', 'db.version(1).stores(...)', async () => {
      await lab.wipe();
      const db = await lab.open(v1);
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      lab.show('friends', [ID, 'name']);
      out.idle('stored at version 1');
    }),
    d.step('Version 2: new key', 'Swapping the key is not supported.', "version(2).stores({ friends: 'name' })", async () => {
      lab.hide();
      const { error } = await tryIt(() =>
        lab.open((x) => {
          v1(x);
          x.version(2).stores({ friends: 'name' });
        }),
      );
      showError(out, error);
    }, 2800),
    d.step('Use it afterwards', 'The failed open leaves it closed.', 'await db.friends.toArray()', async () => {
      const { error } = await tryIt(() => lab.db.table('friends').toArray());
      const inner = (error as { inner?: Error } | undefined)?.inner;
      showError(out, error, `inner: ${inner?.name ?? 'none'}`);
    }, 2800),
    d.step('Open version 1 again', 'Nothing was lost: both friends are there.', 'db.version(1).stores(...)', async () => {
      await lab.open(v1);
      lab.show('friends', [ID, 'name']);
      out.value('2 friends', 'the failed upgrade was rolled back');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
