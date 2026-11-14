// A small notes app: the list on the right is a live query over the table on the left
import Dexie, { liveQuery, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { textField } from '../../shared/controls.ts';
import { caption, columns } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import './style.css';

interface Note {
  id: number;
  text: string;
  createdAt: Date;
}

const SAMPLE = ['Buy oat milk', 'Call Per back', 'Water the plants', 'Book the dentist', 'Return library books'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 340, hint: 'Type a note and press Enter. Reload: the notes stay.' });

  const name = stage.preview ? stage.dbName('notes') : 'showcase-dexie-persistent-notes';
  const db = stage.own(new Dexie(name), { keep: !stage.preview }) as Dexie & {
    notes: EntityTable<Note, 'id'>;
  };
  db.version(1).stores({ notes: '++id, createdAt' });

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 3, 2);
  // A card has room for the note text only; the full view also shows when each was written.
  const cols = [{ field: 'id', width: '3.4em' }, 'text', ...(stage.preview ? [] : [{ field: 'createdAt', width: '6em' }])];
  tableView(stage, left!, { table: db.notes, columns: cols });

  // The app's own list: newest first, redrawn by liveQuery whenever the table changes.
  const list = document.createElement('ul');
  list.className = 'notes';
  right!.append(list);
  const notes = liveQuery(() => db.notes.orderBy('createdAt').reverse().toArray());
  const sub = notes.subscribe({
    next: (rows) => {
      list.replaceChildren(
        ...rows.map((n) => {
          const li = document.createElement('li');
          li.textContent = n.text;
          if (!stage.preview) {
            const del = document.createElement('button');
            del.textContent = '×';
            del.title = 'Delete';
            del.addEventListener('click', stage.action(() => db.notes.delete(n.id)));
            li.append(del);
          }
          return li;
        }),
      );
    },
    error: stage.fail,
  });
  stage.onDispose(() => sub.unsubscribe());

  say.set('Notes live in a table; the list follows it.', "liveQuery(() => db.notes.orderBy('createdAt').reverse().toArray())");

  if (stage.preview) {
    let next = 0;
    stage.play(async (wait) => {
      const text = SAMPLE[next++ % SAMPLE.length]!;
      say.set(`Add a note: "${text}"`, 'db.notes.add({ text, createdAt: new Date() })');
      await db.notes.add({ text, createdAt: new Date() } as Note);
      await wait(1500);
      if ((await db.notes.count()) > 3) {
        const oldest = await db.notes.orderBy('createdAt').first();
        say.set(`Delete the oldest: "${oldest!.text}"`, `db.notes.delete(${oldest!.id})`);
        await db.notes.delete(oldest!.id);
        await wait(1500);
      }
    });
  } else {
    const input = textField(stage, 'New note', '', async (text) => {
      if (!text.trim()) return;
      await db.notes.add({ text: text.trim(), createdAt: new Date() } as Note);
      input.value = '';
    }, 220);
  }

  return stage.dispose;
};

export default mount;
