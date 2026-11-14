// collection.eachUniqueKey(): visit every distinct key once
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { PEOPLE_ROWS, peopleCols, walk } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { table: 'people', stores: 'id, firstName, lastName, age', seed: PEOPLE_ROWS, columns: peopleCols(ctx.preview) });
  const { t, say, out } = d;
  say.set('Three Angelas among six people.', "orderBy('firstName')");
  d.run([
    d.step('eachKey()', 'Every first name, repeats too.', "orderBy('firstName').eachKey(k => ...)", async () => {
      const keys: string[] = [];
      const ids: unknown[] = [];
      await t.orderBy('firstName').eachKey((key, cursor) => {
        keys.push(String(key));
        ids.push(cursor.primaryKey);
      });
      out.list(keys);
      await walk(d, ids, 300);
    }),
    d.step('eachUniqueKey()', 'Each first name once.', "orderBy('firstName').eachUniqueKey(k => ...)", async () => {
      const keys: string[] = [];
      const ids: unknown[] = [];
      await t.orderBy('firstName').eachUniqueKey((key, cursor) => {
        keys.push(String(key));
        ids.push(cursor.primaryKey);
      });
      out.list(keys);
      await walk(d, ids, 380);
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
