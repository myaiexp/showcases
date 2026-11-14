// A counter saved in IndexedDB that survives closing and reopening the database
import Dexie, { type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { caption, columns } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import './style.css';

interface Setting {
  key: string;
  value: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Count up, then reload the page: the count comes back.' });

  // The full view keeps one fixed database across reloads; a card uses its own and deletes it.
  const name = stage.preview ? stage.dbName('counter') : 'showcase-dexie-persistent-counter';
  const db = stage.own(new Dexie(name), { keep: !stage.preview }) as Dexie & {
    settings: EntityTable<Setting, 'key'>;
  };
  db.version(1).stores({ settings: 'key' });

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 1, 1);
  const status = document.createElement('div');
  status.className = 'status';
  const big = document.createElement('div');
  big.className = 'count';
  right!.append(status, big);
  // The grid is drawn by hand here: it must keep showing the row while the database is closed.
  const view = tableView(stage, left!, { title: 'settings', columns: ['key', 'value'] });

  const showStatus = (): void => {
    const open = db.isOpen();
    status.textContent = open ? 'open' : 'closed';
    status.dataset.open = String(open);
    left!.style.opacity = open ? '1' : '0.4';
  };

  const read = async (): Promise<number> => {
    const row = await db.settings.get('counter');
    view.show(row ? [{ ...row }] : []);
    big.textContent = String(row?.value ?? 0);
    showStatus();
    return row?.value ?? 0;
  };
  const save = async (value: number): Promise<void> => {
    await db.settings.put({ key: 'counter', value });
    await read();
  };

  say.set('Open the database and read the saved count.', "db.settings.get('counter')");
  let count = await read();

  if (stage.preview) {
    stage.play(async (wait) => {
      say.set('Count up: each step is saved with put().', "db.settings.put({ key: 'counter', value })");
      for (let i = 0; i < 3; i++) {
        await wait(900);
        count = count >= 9 ? 0 : count + 1;
        await save(count);
      }
      await wait(1200);
      say.set('Close the tab: the connection closes.', 'db.close()');
      db.close({ disableAutoOpen: false });
      big.textContent = '?';
      showStatus();
      await wait(1800);
      say.set('A new visit opens it and reads it back.', "await db.open(); db.settings.get('counter')");
      await db.open();
      count = await read();
      await wait(2000);
    });
  } else {
    button(stage, '−', () => save(--count));
    button(stage, '+', () => save(++count), true);
    button(stage, 'Reset', () => save((count = 0)));
    button(stage, 'Close and reopen', async () => {
      db.close({ disableAutoOpen: false });
      showStatus();
      big.textContent = '?';
      await stage.wait(800);
      await db.open();
      count = await read();
    });
  }

  return stage.dispose;
};

export default mount;
