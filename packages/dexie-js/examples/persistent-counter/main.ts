// Dexie key-value counter with +/-/reset; self-incrementing in previews
import Dexie, { type Table } from 'dexie';
import type { Mount } from '@/types.ts';
import './style.css';

interface Entry {
  key: string;
  value: number;
}
type KvDb = Dexie & { kv: Table<Entry, string> };

const mount: Mount = async (el, { preview, signal }) => {
  const db = new Dexie(
    preview ? 'showcases-dexie-persistent-counter-preview' : 'showcases-dexie-persistent-counter',
  ) as KvDb;
  db.version(1).stores({ kv: 'key' });

  const display = document.createElement('div');
  display.className = 'counter-display';
  const value = document.createElement('div');
  value.className = 'counter-value';
  display.append(value);
  el.append(display);

  let count = 0;
  let timer = 0;
  const save = async () => {
    value.textContent = String(count);
    try {
      await db.kv.put({ key: 'counter', value: count });
    } catch {
      /* database closed while saving: the view was unmounted */
    }
  };

  if (preview) {
    count = 0;
    await save();
    timer = window.setInterval(() => {
      if (signal.aborted) return;
      count++;
      void save();
    }, 1000);
  } else {
    count = (await db.kv.get('counter'))?.value ?? 0;
    value.textContent = String(count);
    const bar = document.createElement('div');
    bar.className = 'counter-buttons';
    const make = (label: string, delta: number | null) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', () => {
        count = delta === null ? 0 : count + delta;
        void save();
      });
      return b;
    };
    bar.append(make('-', -1), make('Reset', null), make('+', 1));
    const hint = document.createElement('p');
    hint.className = 'counter-hint';
    hint.textContent = 'This value is stored in IndexedDB. Reload to verify.';
    display.append(bar, hint);
  }

  return () => {
    clearInterval(timer);
    db.close();
  };
};

export default mount;
