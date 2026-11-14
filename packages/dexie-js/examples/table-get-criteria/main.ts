// Table.get({field: value, ...}): the first row matching all the criteria
import type { Mount } from '@/types.ts';
import { demo, friends, ID_COL } from '../../shared/demo.ts';
import { PEOPLE } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
  stores: '++id, firstName, lastName',
  seed: PEOPLE.map((p, i) => ({ id: i + 1, firstName: p.firstName, lastName: p.lastName })),
  columns: [ID_COL, { field: 'firstName', label: 'first' }, { field: 'lastName', label: 'last' }],
});
  const { stage, db, t, say, view, out } = d;
  const find = (c: Record<string, string>, label: string, text: string, code: string) =>
    d.step(label, text, `db.friends.${code}`, async () => {
      const f = await t.get(c);
      if (f) {
        view.mark([f.id]);
        out.value(`${f.firstName} ${f.lastName}`, `row ${f.id}`);
      } else out.value(undefined, 'nobody matches', 'warn');
    });
  say.set('Six people, find one by name.');
  d.run([
    find({ firstName: 'Angela', lastName: 'Davis' }, 'Angela Davis', 'Both fields must match.', "get({ firstName, lastName })"),
    find({ lastName: 'Merkel' }, 'Merkel', 'Two Merkels: only the first is returned.', "get({ lastName: 'Merkel' })"),
    find({ firstName: 'Nobody' }, 'Nobody', 'No match: undefined.', "get({ firstName: 'Nobody' })"),
  ]);

  return stage.dispose;
};

export default mount;
