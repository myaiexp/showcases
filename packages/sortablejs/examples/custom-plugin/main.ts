// A chore wall using a home-made plugin that counts how many times each chore was moved
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import MoveCounter from './plugin.ts';
import './style.css';

// Mounting makes `moveCounter` a real Sortable option. It is page-wide, so only once.
mountOnce(MoveCounter as unknown as Parameters<typeof mountOnce>[0]);

const CHORES = ['Dishes', 'Laundry', 'Vacuum', 'Bins out', 'Water plants'];

const mount: Mount = (el, { preview, signal }) => {
  const wall = document.createElement('div');
  wall.className = 'wall';
  const make = (title: string, note: string): { list: HTMLElement; total: HTMLElement } => {
    const col = document.createElement('section');
    col.className = 'col';
    col.innerHTML = '<h3></h3><p class="note"></p><ul class="chores"></ul><p class="total"></p>';
    col.querySelector('h3')!.textContent = title;
    col.querySelector('.note')!.textContent = note;
    const list = col.querySelector<HTMLElement>('ul')!;
    for (const name of CHORES.slice(0, preview ? 4 : 5)) {
      const li = document.createElement('li');
      li.className = 'chore';
      li.textContent = name;
      list.append(li);
    }
    wall.append(col);
    return { list, total: col.querySelector<HTMLElement>('.total')! };
  };

  const tracked = make('Counted', 'moveCounter: true');
  tracked.total.textContent = 'moves so far: 0';
  const plain = make('Not counted', 'option not set');
  plain.total.textContent = 'the plugin ignores this list';
  if (preview) plain.list.parentElement!.remove();
  el.append(wall);

  const counted = Sortable.create(tracked.list, {
    animation: 150,
    moveCounter: true, // turns the plugin on for this list only
    onMoveCounted: (total: number) => {
      tracked.total.textContent = `moves so far: ${total}`; // the plugin's own callback option
    },
  } as Sortable.Options);
  const ignored = preview ? null : Sortable.create(plain.list, { animation: 150 });

  if (preview) {
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const rows = [...tracked.list.children].filter((c) => !c.classList.contains('sortable-fallback'));
      const first = rows[0]!;
      const last = rows[rows.length - 1]!;
      const up = turn++ % 2 === 1; // down to the bottom, then back up to the top
      await hand.drag(up ? last : first, { el: up ? first : last, fy: up ? 0.2 : 0.8 }, 0.9);
    }, 0.5);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Shuffle chores in the left list: each drop adds one to its badge and to the total. The right list is an ordinary Sortable, so the plugin never touches it.';
    el.append(hint);
  }

  return () => (ignored ? release(counted, ignored) : release(counted));
};

export default mount;
