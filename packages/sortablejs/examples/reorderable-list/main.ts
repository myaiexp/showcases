// Sortable.js priority list with drag handles and an order readout
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import './style.css';

const TASKS = [
  'Ship the landing page',
  'Fix the login bug',
  'Write release notes',
  'Review open pull requests',
  'Reply to user feedback',
] as const;

const mount: Mount = (el, { preview }) => {
  const list = document.createElement('ul');
  list.className = 'list';
  for (const task of TASKS) {
    const item = document.createElement('li');
    item.className = 'item';
    item.dataset['id'] = task;
    const handle = document.createElement('span');
    handle.className = 'handle';
    handle.textContent = '⠿';
    const label = document.createElement('span');
    label.textContent = task;
    const rank = document.createElement('span');
    rank.className = 'rank';
    item.append(handle, label, rank);
    list.append(item);
  }
  el.append(list);

  const readout = document.createElement('div');
  readout.className = 'readout';
  if (!preview) el.append(readout);

  const update = (): void => {
    const items = [...list.querySelectorAll<HTMLElement>('.item')];
    const names = items.map((it) => it.dataset['id'] ?? '');
    items.forEach((it, i) => {
      const rank = it.querySelector('.rank');
      if (rank) rank.textContent = `#${i + 1}`;
    });
    const label = document.createElement('b');
    label.textContent = 'Order:';
    readout.replaceChildren(label, ` ${names.map((n, i) => `${i + 1}. ${n}`).join('  →  ')}`);
  };

  const sortable = new Sortable(list, {
    animation: 150,
    handle: '.handle',
    ghostClass: 'ghost',
    chosenClass: 'chosen',
    dragClass: 'dragging',
    onSort: update,
  });
  update();

  // A preview takes no input, so it rotates the order on a timer (animated by Sortable).
  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => {
      const order = sortable.toArray();
      const first = order.shift();
      if (first !== undefined) order.splice(2, 0, first);
      sortable.sort(order, true);
      update();
    }, 1400);
  }

  return () => {
    window.clearInterval(timer);
    sortable.destroy();
  };
};

export default mount;
