// A favourites ranking whose badge shows the dragged row's rank before it is dropped
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const PIZZAS = ['Margherita', 'Diavola', 'Quattro formaggi', 'Funghi', 'Hawaiian'];

const mount: Mount = (el, { preview, signal }) => {
  const badge = document.createElement('div');
  badge.className = 'badge';
  const list = document.createElement('ul');
  list.className = 'ranking';
  for (const name of PIZZAS) {
    const li = document.createElement('li');
    li.className = 'pizza';
    li.innerHTML = '<span class="pos"></span><span class="name"></span>';
    li.querySelector('.name')!.textContent = name;
    list.append(li);
  }
  el.append(badge, list);
  el.classList.toggle('compact', preview);

  const number = (): void => {
    [...list.children].forEach((row, i) => {
      if (row !== Sortable.ghost) row.querySelector('.pos')!.textContent = String(i + 1);
    });
  };
  const idle = (): void => {
    badge.textContent = `Your favourite: ${list.firstElementChild!.querySelector('.name')!.textContent}`;
    badge.classList.remove('live');
  };
  const say = (e: Sortable.SortableEvent): void => {
    badge.textContent = `${e.item.querySelector('.name')!.textContent}: you're now #${(e.newIndex ?? 0) + 1}`;
    badge.classList.add('live');
  };
  number();
  idle();

  const sortable = Sortable.create(list, {
    animation: 150,
    ghostClass: 'ghost',
    onStart: say, // the badge appears at the row's starting rank
    onChange: say, // ...and follows it each time it passes a neighbour
    onEnd: () => {
      number();
      idle();
    },
  });

  if (preview) {
    // Carry the last pizza up to the top, one slow pass.
    loopDrive(el, signal, async (hand) => {
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 1.8);
    }, 0.8);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Pick a pizza up and move it slowly: the badge changes before you drop.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
