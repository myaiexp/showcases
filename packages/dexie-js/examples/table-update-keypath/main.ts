// Table.update(key, {'address.zip': value}) changes one nested property
import type { Mount } from '@/types.ts';
import { demo, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
  stores: 'id, name',
  seed: [
    { id: 1, name: 'Josephine', address: { city: 'Oslo', zip: 1234 } },
    { id: 2, name: 'Per', address: { city: 'Rome', zip: 5678 } },
  ],
  columns: [
    ID_COL,
    'name',
    {
      field: 'address',
      label: 'city · zip',
      format: (v) => {
        const a = (v ?? {}) as { city?: string; zip?: number };
        return `${a.city ?? '?'} · ${a.zip ?? '?'}`;
      },
    },
  ],
});
  const { stage, db, t, say, view, out } = d;
  say.set('Each friend has an address object.');
  d.run([
    d.step('Replace address', 'A whole object replaces the address.', 'update(1, { address: { zip: 9999 } })', async () => {
      await t.update(1, { address: { zip: 9999 } });
      out.value('city lost', 'the whole address was swapped', 'warn');
    }),
    d.step("'address.zip'", 'A dotted path changes just that part.', "update(2, { 'address.zip': 9999 })", async () => {
      await t.update(2, { 'address.zip': 9999 });
      out.value('city kept', 'only the zip changed');
    }),
  ]);

  return stage.dispose;
};

export default mount;
