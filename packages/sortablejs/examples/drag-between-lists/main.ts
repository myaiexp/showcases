// Sortable.js Kanban board: three lists sharing one group with live counts
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import './style.css';

const COLUMNS = [
  { title: 'To Do', color: 'var(--blue)', cards: ['Design empty states', 'Audit color contrast', 'Draft onboarding copy'] },
  { title: 'In Progress', color: 'var(--orange)', cards: ['Build settings page', 'Wire up analytics'] },
  { title: 'Done', color: 'var(--green)', cards: ['Set up CI pipeline'] },
] as const;

const mount: Mount = (el, { preview }) => {
  const board = document.createElement('div');
  board.className = 'board';
  const lists: HTMLElement[] = [];
  const counts: HTMLElement[] = [];

  for (const col of COLUMNS) {
    const column = document.createElement('div');
    column.className = 'column';
    const head = document.createElement('div');
    head.className = 'head';
    const title = document.createElement('h3');
    title.textContent = col.title;
    const count = document.createElement('span');
    count.className = 'count';
    head.append(title, count);
    const list = document.createElement('ul');
    list.className = 'cards';
    for (const text of col.cards) {
      const card = document.createElement('li');
      card.className = 'task';
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.style.background = col.color;
      const label = document.createElement('span');
      label.className = 'card-text';
      label.textContent = text;
      card.append(dot, label);
      list.append(card);
    }
    column.append(head, list);
    board.append(column);
    lists.push(list);
    counts.push(count);
  }
  el.append(board);

  const updateCounts = (): void => {
    lists.forEach((list, i) => {
      const count = counts[i];
      if (count) count.textContent = String(list.children.length);
    });
  };

  const sortables = lists.map(
    (list) =>
      new Sortable(list, {
        group: 'kanban',
        animation: 150,
        ghostClass: 'ghost',
        chosenClass: 'chosen',
        dragClass: 'dragging',
        onSort: updateCounts,
      }),
  );
  updateCounts();

  // A preview takes no input, so it moves a card to the next column on a timer.
  let timer = 0;
  if (preview) {
    let step = 0;
    timer = window.setInterval(() => {
      const from = step % lists.length;
      const to = (from + 1) % lists.length;
      step++;
      const card = lists[from]?.lastElementChild;
      if (card) lists[to]?.prepend(card);
      updateCounts();
    }, 1000);
  }

  return () => {
    window.clearInterval(timer);
    for (const s of sortables) s.destroy();
  };
};

export default mount;
