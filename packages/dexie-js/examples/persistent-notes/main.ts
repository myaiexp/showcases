// Dexie-backed notes list with add and delete; seeded static list in previews
import Dexie, { type Table } from 'dexie';
import type { Mount } from '@/types.ts';
import './style.css';

interface Note {
  id?: number;
  text: string;
  createdAt: Date;
}
type NotesDb = Dexie & { notes: Table<Note, number> };

function openDb(name: string): NotesDb {
  const db = new Dexie(name) as NotesDb;
  db.version(1).stores({ notes: '++id, text, createdAt' });
  return db;
}

const SEED = ['Buy oat milk', 'Reply to Sam about Friday', 'Read the Dexie docs', 'Water the plants'];

const mount: Mount = async (el, { preview, signal }) => {
  const db = openDb(preview ? 'showcases-dexie-persistent-notes-preview' : 'showcases-dexie-persistent-notes');
  const wrap = document.createElement('div');
  wrap.className = 'notes';
  const list = document.createElement('ul');
  list.className = 'notes-list';
  const count = document.createElement('p');
  count.className = 'note-count';

  const render = async () => {
    const notes = await db.notes.orderBy('createdAt').reverse().toArray();
    if (signal.aborted) return;
    count.textContent = `${notes.length} note${notes.length === 1 ? '' : 's'} stored in IndexedDB`;
    list.replaceChildren();
    if (notes.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'notes-empty';
      empty.textContent = 'No notes yet. Add one above.';
      list.append(empty);
      return;
    }
    for (const n of notes) {
      const li = document.createElement('li');
      const text = document.createElement('span');
      text.className = 'note-text';
      text.textContent = n.text;
      const time = document.createElement('span');
      time.className = 'note-time';
      time.textContent = n.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      li.append(text, time);
      if (!preview) {
        const del = document.createElement('button');
        del.className = 'note-delete';
        del.textContent = 'Delete';
        del.addEventListener('click', async () => {
          await db.notes.delete(n.id as number);
          await render();
        });
        li.append(del);
      }
      list.append(li);
    }
  };

  if (preview) {
    await db.notes.clear();
    const now = Date.now();
    await db.notes.bulkAdd(SEED.map((text, i) => ({ text, createdAt: new Date(now - i * 60_000) })));
  } else {
    const row = document.createElement('div');
    row.className = 'note-input-row';
    const input = document.createElement('input');
    input.className = 'note-input';
    input.placeholder = 'Write a note...';
    const add = document.createElement('button');
    add.className = 'btn';
    add.textContent = 'Add';
    const submit = async () => {
      const text = input.value.trim();
      if (!text) return;
      await db.notes.add({ text, createdAt: new Date() });
      input.value = '';
      input.focus();
      await render();
    };
    add.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') void submit();
    });
    row.append(input, add);
    wrap.append(row);
  }
  wrap.append(list, count);
  el.append(wrap);
  await render();

  return () => db.close();
};

export default mount;
