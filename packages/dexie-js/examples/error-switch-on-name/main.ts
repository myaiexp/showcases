// One switch on error.name turns many Dexie failures into messages
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { demo, FRIEND_COLS, friends } from '../../shared/demo.ts';
import { errorOf } from '../../shared/hook-kit.ts';

function friendly(error: Error): string {
  switch (error.name) {
    case Dexie.errnames.Constraint:
      return 'That id or email is already taken.';
    case Dexie.errnames.Data:
      return 'That id is not a valid key.';
    case Dexie.errnames.Schema:
      return 'You cannot search by that field.';
    case Dexie.errnames.InvalidTable:
      return 'There is no such table.';
    default:
      return `Something else went wrong (${error.name}).`;
  }
}

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(2), columns: FRIEND_COLS, side: 'log' });
  const { stage, db, t, log } = d;
  d.say.set('Four things that go wrong, one handler.', 'switch (error.name) { case Dexie.errnames.Constraint: ... }');
  const fail = (label: string, text: string, code: string, fn: () => unknown) =>
    d.step(label, text, code, async () => {
      log.clear();
      const error = await errorOf(fn);
      if (!error) return log.add('no error', 'muted');
      log.add(error.name, 'bad');
      log.add(friendly(error), 'warn');
    }, 2500);
  d.run([
    fail('Duplicate id', 'A clash.', 't.add({ id: 1, ... })', () => t.add({ id: 1, name: 'Twin' })),
    fail('Bad id', 'A key of the wrong kind.', 't.add({ id: true })', () => t.add({ id: true, name: 'Bool' })),
    fail('Unindexed search', 'A search with no index.', "t.where('age').above(3)", () => t.where('age').above(3).toArray()),
    fail('Missing table', 'A table that is not there.', "db.table('pets')", () => db.table('pets')),
  ]);
  return stage.dispose;
};

export default mount;
