// A middleware scrambles a field on the way in and restores it on the way out
import type { Mount } from '@/types.ts';
import { plainDemo } from '../../shared/hook-kit.ts';

type Row = { note?: string };
// btoa/atob: obscures, but is not real encryption. Rows are copied, never edited in place.
const hide = (row: Row): Row => (row?.note === undefined ? row : { ...row, note: btoa(row.note) });
const reveal = (row: Row): Row => (row?.note === undefined ? row : { ...row, note: atob(row.note) });

const mount: Mount = (el, ctx) => {
  const seed = [{ id: 1, name: 'Sara', note: 'call mum' }, { id: 2, name: 'Per', note: 'buy milk' }];
  const d = plainDemo(el, ctx, { stores: 'id, name', seed, columns: ['name', { field: 'note', label: 'stored note' }] });
  const { stage, db, t, out } = d;
  db.use({
    stack: 'dbcore',
    name: 'ObscureNotes',
    create: (down) => ({
      ...down,
      table: (tableName) => {
        const table = down.table(tableName);
        return {
          ...table,
          mutate: (req) =>
            req.type === 'add' || req.type === 'put' ? table.mutate({ ...req, values: req.values.map(hide) }) : table.mutate(req),
          get: (req) => table.get(req).then(reveal),
          getMany: (req) => table.getMany(req).then((rows) => rows.map(reveal)),
          query: (req) => table.query(req).then((res) => (req.values ? { ...res, result: res.result.map(reveal) } : res)),
        };
      },
    }),
  });
  d.say.set('The grid shows what is stored: scrambled.', 'mutate: hide(note) / get, query: reveal(note)');
  d.run([
    d.step('Save a note', 'It goes in scrambled.', "t.add({ id: 3, name: 'Elna', note: 'meet at five' })", async () => {
      await t.add({ id: 3, name: 'Elna', note: 'meet at five' });
      out.value('meet at five', 'what you passed in');
    }),
    d.step('Read one back', 'get() hands back the original.', 't.get(3)', async () => {
      out.value((await t.get(3)).note, 'what get() returns');
    }),
    d.step('Read everyone', 'toArray() restores each note.', 't.toArray()', async () => {
      out.list((await t.toArray()).map((r) => r.note));
    }),
  ]);
  return stage.dispose;
};

export default mount;
