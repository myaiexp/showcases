// Dexie.getDatabaseNames() lists databases; we filter to our own
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, resultPanel } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tour } from '../../shared/tour.ts';

const NAMES = ['friends', 'pets', 'cars'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the steps in order. Reset starts over.' });
  const say = caption(stage.root);
  const out = resultPanel(stage.root, 'our databases');
  const prefix = `${stage.dbName('names')}-`;
  const open: Dexie[] = [];

  // The site holds other examples' databases too, so keep only the names this card made.
  const list = async (code: string, text: string): Promise<void> => {
    const all = await Dexie.getDatabaseNames();
    const ours = all.filter((n) => n.startsWith(prefix)).map((n) => n.slice(prefix.length));
    say.set(`${text} (the site has ${all.length} in all)`, code);
    out.list(ours.length ? ours : ['(none yet)'], ours.length ? 'ok' : 'warn');
  };
  const wipe = async (): Promise<void> => {
    for (const db of open.splice(0)) db.close();
    await Promise.all(NAMES.map((n) => Dexie.delete(prefix + n)));
  };
  stage.onDispose(() => void wipe().catch(() => undefined));

  tour(
    stage,
    [
      { label: 'List names', run: () => list('await Dexie.getDatabaseNames()', 'Ours so far:') },
      {
        label: 'Create three',
        run: async () => {
          for (const n of NAMES) {
            const db = new Dexie(prefix + n);
            db.version(1).stores({ items: '++id' });
            await db.open();
            open.push(db);
          }
          await list('await Dexie.getDatabaseNames()', 'Three databases created.');
        },
      },
      {
        label: 'Delete one',
        run: async () => {
          await Dexie.delete(`${prefix}pets`);
          await list('await Dexie.getDatabaseNames()', '"pets" deleted.');
        },
      },
    ],
    {
      setup: wipe,
      reset: async () => {
        await wipe();
        out.clear();
        say.set('Starting over.');
        await stage.wait(900);
      },
    },
  );
  return stage.dispose;
};

export default mount;
