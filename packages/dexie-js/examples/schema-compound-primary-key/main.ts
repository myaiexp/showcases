// A primary key of two fields: the pair is the identity, so the same pair is one row
import type { Mount } from '@/types.ts';
import { AGE_COL, demo } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: '[name+city]',
    label: 'people',
    table: 'people',
    seed: [{ name: 'Per', city: 'Malmö', age: 40 }],
    columns: ['name', 'city', AGE_COL],
  });
  const { stage, t, say, out } = d;
  say.set('A person is a name plus a city.', "stores({ people: '[name+city]' })");
  d.run([
    d.step('Same name, new city', 'A different pair is a different row.', "put({ name: 'Per', city: 'Oslo', age: 33 })", async () => {
      out.value(await t.put({ name: 'Per', city: 'Oslo', age: 33 }), 'the key is the pair');
    }),
    d.step('Same pair again', 'The same pair replaces its row.', "put({ name: 'Per', city: 'Oslo', age: 34 })", async () => {
      await t.put({ name: 'Per', city: 'Oslo', age: 34 });
      out.value(await t.count(), 'rows: still 2');
    }),
    d.step('Get by pair', 'Ask for a row with the pair.', "db.people.get(['Per', 'Malmö'])", async () => {
      out.value(await t.get(['Per', 'Malmö']));
    }),
  ]);
  return stage.dispose;
};

export default mount;
