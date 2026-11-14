// Two waiting-room queues: one swaps on a row's middle, one drops a patient in between rows
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const PATIENTS = ['Alder', 'Birch', 'Cedar', 'Dogwood'];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'pair';
  const lists = [false, true].map((inverted) => {
    const col = document.createElement('section');
    col.innerHTML = '<h3></h3><ul class="list"></ul>';
    col.querySelector('h3')!.textContent = inverted ? 'invertSwap: true' : 'default';
    const list = col.querySelector('ul')!;
    list.classList.toggle('inverted', inverted);
    for (const name of preview ? PATIENTS : [...PATIENTS, 'Elm']) {
      const row = document.createElement('li');
      row.className = 'row';
      row.innerHTML = '<i class="zone a"></i><i class="zone b"></i><span class="name"></span>';
      row.querySelector('.name')!.textContent = name;
      list.append(row);
    }
    wrap.append(col);
    return list;
  });
  el.append(wrap);
  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Shaded = the swap zone. Left: a row swaps when you reach its middle. Right: only its top and bottom edges count, so you drop between rows.';
    el.append(hint);
  }

  // Both queues use a half-height zone; invertSwap moves it from the middle of each row to its two edges.
  const sortables = lists.map((list) =>
    Sortable.create(list, {
      animation: 150,
      swapThreshold: 0.5,
      invertSwap: list.classList.contains('inverted'),
      ghostClass: 'ghost',
    }),
  );

  if (preview) {
    // Same move in both queues: take the last row and drop it on the first row's edge.
    loopDrive(el, signal, async (hand) => {
      for (const list of lists) {
        await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.12 }, 0.9);
      }
    }, 0.4);
  }

  return () => release(...sortables);
};

export default mount;
