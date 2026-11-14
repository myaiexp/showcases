// A priority list reordered by drag handles, with ranks that follow every drop
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const TASKS = ['Fix the login bug', 'Ship the landing page', 'Write release notes', 'Review pull requests', 'Reply to feedback'];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'list';
  for (const task of TASKS) {
    const item = document.createElement('li');
    item.className = 'item';
    item.dataset['id'] = task;
    item.innerHTML = '<span class="handle" aria-hidden="true">⠿</span><span class="text"></span><span class="rank"></span>';
    item.querySelector('.text')!.textContent = task;
    list.append(item);
  }
  el.append(list);

  // Re-number the rows after every change.
  const rank = (): void => {
    [...list.children].forEach((row, i) => {
      row.querySelector('.rank')!.textContent = `#${i + 1}`;
    });
  };
  rank();

  const sortable = Sortable.create(list, {
    handle: '.handle', // only the grip starts a drag, so the text stays selectable
    animation: 150, // other rows slide out of the way instead of jumping
    ghostClass: 'ghost', // the dashed slot where the row will land
    onSort: rank, // fires on any change to the list's order
  });

  if (preview) {
    // Pull the last task up to the top by its handle, again and again.
    loopDrive(el, signal, async (hand) => {
      const last = list.lastElementChild!;
      await hand.drag(last.querySelector('.handle')!, { el: list.firstElementChild!, fy: 0.2 }, 1.1);
    });
  }

  return () => release(sortable);
};

export default mount;
