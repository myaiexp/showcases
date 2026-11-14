// A three-column task board: cards move between columns that share one group name
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const COLUMNS = [
  { title: 'To do', color: 'var(--blue)', cards: ['Design empty states', 'Audit contrast', 'Draft onboarding'] },
  { title: 'Doing', color: 'var(--orange)', cards: ['Settings page', 'Analytics'] },
  { title: 'Done', color: 'var(--green)', cards: ['CI pipeline'] },
];

const mount: Mount = (el, { preview, signal }) => {
  const board = document.createElement('div');
  board.className = 'board';
  const lists = COLUMNS.map((col) => {
    const column = document.createElement('section');
    column.className = 'column';
    column.style.setProperty('--col', col.color);
    column.innerHTML = '<header><h3></h3><span class="count"></span></header><ul class="cards"></ul>';
    column.querySelector('h3')!.textContent = col.title;
    const list = column.querySelector('ul')!;
    for (const text of col.cards) {
      const card = document.createElement('li');
      card.className = 'task';
      card.textContent = text;
      list.append(card);
    }
    board.append(column);
    return list;
  });
  el.append(board);

  const count = (): void => {
    for (const list of lists) list.parentElement!.querySelector('.count')!.textContent = String(list.children.length);
  };
  count();

  // The same group name on every column is what lets cards travel between them.
  const sortables = lists.map((list) =>
    Sortable.create(list, {
      group: 'board',
      animation: 150,
      ghostClass: 'ghost',
      onSort: count, // fires in both columns: the one losing a card and the one gaining it
    }),
  );

  if (preview) {
    // Work flows left to right; once everything is done, it all goes back to "To do".
    let col = 0;
    loopDrive(el, signal, async (hand) => {
      const from = lists[col]!;
      const to = lists[(col + 1) % lists.length]!;
      const card = from.firstElementChild;
      if (card) await hand.drag(card, to.firstElementChild ? { el: to.firstElementChild, fy: 0.2 } : to, 1);
      if (!from.firstElementChild) col = (col + 1) % lists.length;
    }, 0.5);
  }

  return () => release(...sortables);
};

export default mount;
