// A Dexie error up close: name, message, inner cause and family
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { attempt, demo, friends, ID_COL } from '../../shared/demo.ts';
import { clip } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(2), columns: [ID_COL, 'name'] });
  const { stage, t, out } = d;
  let caught: (Error & { inner?: Error }) | undefined;
  d.say.set('Make an error, then take it apart.');
  d.run([
    d.step('Add a duplicate id', 'Row 1 exists: the add fails.', "t.add({ id: 1, name: 'Twin' })", async () => {
      caught = (await attempt(t.add({ id: 1, name: 'Twin' }))).error;
      out.value(caught?.name, 'caught in a try/catch', 'bad');
    }),
    d.step('Read its parts', 'name and message tell what and why.', 'error.name, error.message, error.inner', () => {
      out.list(
        [
          `name: ${caught?.name}`,
          `message: ${clip(caught?.message ?? '', 34)}`,
          `inner: ${caught?.inner?.name ?? 'none'}`,
        ],
        'bad',
      );
    }, 2800),
    d.step('Where it sits', 'Every Dexie error belongs to a family.', 'error instanceof Dexie.DexieError', () => {
      out.list(
        [
          `Error: ${caught instanceof Error}`,
          `DexieError: ${caught instanceof Dexie.DexieError}`,
          `ConstraintError: ${caught instanceof Dexie.ConstraintError}`,
          `ModifyError: ${caught instanceof Dexie.ModifyError}`,
        ],
        'warn',
      );
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
