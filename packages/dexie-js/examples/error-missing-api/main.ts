// MissingAPIError: a Dexie with no working IndexedDB stays closed
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { tour } from '../../shared/tour.ts';
import { caption, resultPanel } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { errorOf, showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the steps in order.' });
  const say = caption(stage.root);
  const out = resultPanel(stage.root, 'what happened');
  // The indexedDB option stands in for a browser or Node without IndexedDB: open() gets nothing back.
  const noApi = { open: () => null } as unknown as IDBFactory;
  const broken = stage.own(new Dexie(stage.dbName('noapi'), { indexedDB: noApi }), { keep: true });
  broken.version(1).stores({ friends: '++id, name' });
  const fresh = stage.own(new Dexie(stage.dbName('fine')));
  fresh.version(1).stores({ friends: '++id, name' });
  say.set('Two databases: one with a real IndexedDB, one without.', "new Dexie(name, { indexedDB })");
  const steps = [
    {
      label: 'Open the normal one',
      hold: 1900,
      run: async () => {
        say.set('A real IndexedDB: opens fine.', 'await new Dexie(name).open()');
        await fresh.open();
        out.value('open', `isOpen(): ${fresh.isOpen()}`);
      },
    },
    {
      label: 'Open the one without',
      hold: 2800,
      run: async () => {
        say.set('IndexedDB missing: open() fails.', 'await new Dexie(name, { indexedDB: none }).open()');
        showError(out, await errorOf(() => broken.open()));
      },
    },
    {
      label: 'Use it anyway',
      hold: 2800,
      run: async () => {
        say.set('It never opened, so every call fails.', 'await db.friends.toArray()');
        const error = await errorOf(() => broken.table('friends').toArray());
        showError(out, error, `inner: ${(error as { inner?: Error } | undefined)?.inner?.name ?? 'none'}`);
      },
    },
  ];
  tour(stage, steps);
  return stage.dispose;
};

export default mount;
