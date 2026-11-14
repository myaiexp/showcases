// "address.city": a dotted path indexes a field inside a nested object
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: '++id, name, address.city',
    label: 'users',
    table: 'users',
    seed: [
      { id: 1, name: 'Zlatan', address: { city: 'Malmö', country: 'Sweden' } },
      { id: 2, name: 'Ulla', address: { city: 'Stockholm', country: 'Sweden' } },
      { id: 3, name: 'Xavi', address: { city: 'Barcelona', country: 'Spain' } },
      { id: 4, name: 'Ebba', address: { city: 'Malmö', country: 'Sweden' } },
    ],
    columns: ctx.preview ? ['name', { field: 'address.city', label: 'city' }] : ['name', 'address.city', 'address.country'],
  });
  const { stage, t, say, view, out } = d;
  say.set('The city sits inside address.', "stores({ users: '++id, name, address.city' })");
  d.run([
    d.step('Who lives in Malmö?', 'Search by the nested field.', "where('address.city').equals('Malmö')", async () => {
      const rows = await t.where('address.city').equals('Malmö').toArray();
      view.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => r.name));
    }),
    d.step('Stockholm or Barcelona', 'Any other operator works too.', "where('address.city').anyOf('Stockholm', 'Barcelona')", async () => {
      const rows = await t.where('address.city').anyOf('Stockholm', 'Barcelona').toArray();
      view.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => r.name));
    }),
  ]);
  return stage.dispose;
};

export default mount;
