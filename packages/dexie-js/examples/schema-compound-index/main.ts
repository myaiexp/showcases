// "[firstName+lastName]": declare one index over a pair of fields, then look a pair up
import type { Mount } from '@/types.ts';
import { demo, ID_COL } from '../../shared/demo.ts';

const ROWS = [
  { id: 1, firstName: 'Angela', lastName: 'Merkel' },
  { id: 2, firstName: 'Angela', lastName: 'Davis' },
  { id: 3, firstName: 'David', lastName: 'Fahlander' },
  { id: 4, firstName: 'Sara', lastName: 'Merkel' },
];

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: 'id, [firstName+lastName]',
    seed: ROWS,
    columns: [{ ...ID_COL, width: '2em' }, 'firstName', 'lastName'],
  });
  const { stage, t, say, view, out } = d;
  say.set('One index covers first and last name together.', "stores({ people: 'id, [firstName+lastName]' })");
  d.run([
    d.step('The declared index', 'Its name lists both fields.', 'db.people.schema.indexes', async () => {
      out.list(t.schema.indexes.map((i: { name: string }) => i.name));
    }),
    d.step('Look up a pair', 'Only the exact pair matches.', "where('[firstName+lastName]').equals(['Angela', 'Merkel'])", async () => {
      const rows = await t.where('[firstName+lastName]').equals(['Angela', 'Merkel']).toArray();
      view.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => `${r.firstName} ${r.lastName}`));
    }),
    d.step('First name alone', 'The first half works as an index too.', "where('firstName').equals('Angela')", async () => {
      const rows = await t.where('firstName').equals('Angela').toArray();
      view.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => `${r.firstName} ${r.lastName}`));
    }),
  ]);
  return stage.dispose;
};

export default mount;
