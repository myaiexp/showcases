// collection.modify(): catching a ModifyError that reports which rows failed
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';

const rows = [
  { id: 1, name: 'Sara', email: 'sara@a.org' },
  { id: 2, name: 'Per', email: 'per@a.org' },
  { id: 3, name: 'Simon', email: 'simon@a.org' },
  { id: 4, name: 'Elna', email: 'elna@a.org' },
];

const mount: Mount = (el, ctx) => {
  const columns = [{ field: 'name', width: '4.5em' }, 'email'];
  const d = demo(el, ctx, { stores: 'id, name, &email', seed: rows, columns, side: 'result' });
  const { t, say, view, out } = d;
  say.set('Each friend has a unique email.', "stores: 'id, name, &email'");
  d.run([
    d.step('Same email for all', 'Give all four the same email.', "modify({ email: 'team@a.org' })", async () => {
      try {
        await t.toCollection().modify({ email: 'team@a.org' });
        out.value('no error', undefined, 'warn');
      } catch (err) {
        if (!(err instanceof Dexie.ModifyError)) throw err;
        view.mark(err.failedKeys, 'bad', false);
        out.value(`${err.successCount} ok`, `${err.failures.length} failed`, 'warn');
      }
    }, 3000),
  ]);
  return d.stage.dispose;
};

export default mount;
