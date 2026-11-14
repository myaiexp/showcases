// Asking the browser to keep this site's data instead of clearing it when space runs low
import Dexie, { type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { caption, columns, eventLog } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import './style.css';

interface Song {
  id: number;
  title: string;
}

/** Check if storage is persisted already (the docs' helper). */
async function isStoragePersisted() {
  return (await navigator.storage) && navigator.storage.persisted ? navigator.storage.persisted() : undefined;
}

/** Tries to convert to persisted storage (the docs' helper). It may show the user a prompt. */
async function persist() {
  return (await navigator.storage) && navigator.storage.persist ? navigator.storage.persist() : undefined;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Asking may show a browser prompt, or be decided silently.' });
  const db = stage.own(new Dexie(stage.dbName('music'))) as Dexie & { songs: EntityTable<Song, 'id'> };
  db.version(1).stores({ songs: '++id' });
  await db.songs.bulkAdd([{ title: 'Offline mix 1' }, { title: 'Offline mix 2' }, { title: 'Road trip' }] as Song[]);

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 1, 1);
  tableView(stage, left!, { table: db.songs, title: 'downloaded songs', columns: ['title'] });
  const mode = document.createElement('div');
  mode.className = 'mode';
  right!.append(mode);
  const log = eventLog(right!, 'checks', 5);

  const show = async () => {
    const persisted = await isStoragePersisted();
    mode.dataset.state = String(persisted);
    mode.textContent =
      persisted === undefined ? 'no StorageManager here' : persisted ? 'persistent: kept' : 'best-effort: may be cleared';
    log.add(`persisted() → ${persisted}`, persisted ? 'ok' : 'warn');
  };

  say.set('Is this data safe from cleanup?', 'navigator.storage.persisted()');
  await show();
  if (stage.preview) {
    // A card only reads the status; asking could put a prompt in front of the reader.
    stage.every(4000, () => void show());
  } else {
    button(stage, 'Check again', show);
    button(
      stage,
      'Ask to persist',
      async () => {
        say.set('Ask the browser to keep it.', 'navigator.storage.persist()');
        const granted = await persist();
        log.add(`persist() → ${granted}`, granted ? 'ok' : 'bad');
        await show();
      },
      true,
    );
  }

  return stage.dispose;
};

export default mount;
