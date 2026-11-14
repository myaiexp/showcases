// An addon extends only the Dexie instance it is handed
import type Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { friends, FRIEND_COLS } from '../../shared/demo.ts';
import { errorOf, plainDemo, showError } from '../../shared/hook-kit.ts';

type Extendable = { Collection: { prototype: Record<string, unknown> } };
const protoOf = (db: Dexie): Record<string, unknown> => (db as unknown as Extendable).Collection.prototype;

// The docs' addon: it adds forEach() to the Collection class of the one db it receives.
function forEachAddon(db: Dexie): void {
  protoOf(db).forEach = protoOf(db).each;
}

const mount: Mount = (el, ctx) => {
  const d = plainDemo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS });
  const { stage, db, t, plain, out } = d;
  const kind = (table: typeof t): string => typeof (table.toCollection() as unknown as Record<string, unknown>).forEach;
  d.say.set('Two connections to the same database, A and B.', 'function ForEachAddon(db) { ... }');
  d.run([
    d.step('Neither has forEach', 'Collections have each(), not forEach().', 'typeof collection.forEach', () => {
      delete protoOf(db).forEach;
      delete protoOf(plain.db).forEach;
      out.list([`A: ${kind(t)}`, `B: ${kind(plain)}`], 'warn');
    }),
    d.step('Apply the addon to A', 'Only A is handed to the addon.', 'ForEachAddon(dbA)', () => {
      forEachAddon(db);
      out.list([`A: ${kind(t)}`, `B: ${kind(plain)}`]);
    }),
    d.step('Use it on A', 'forEach() on A works like each().', 'await A.friends.toCollection().forEach(fn)', async () => {
      const names: string[] = [];
      await (t.toCollection() as unknown as { forEach(fn: (r: { name: string }) => void): Promise<void> }).forEach((r) => {
        names.push(r.name);
      });
      out.list(names);
    }),
    d.step('Try it on B', 'B never got the addon.', 'await B.friends.toCollection().forEach(fn)', async () => {
      const error = await errorOf(() =>
        (plain.toCollection() as unknown as { forEach(fn: () => void): Promise<void> }).forEach(() => undefined),
      );
      showError(out, error);
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
