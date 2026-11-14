// An itinerary with Edit and Done: destroy() removes sorting, create() brings it back
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const STOPS = ['Lisbon', 'Porto', 'Madrid', 'Seville', 'Granada'];

const mount: Mount = (el, { preview, signal }) => {
  const head = document.createElement('div');
  head.className = 'head';
  head.innerHTML = '<span class="mode"></span>';
  const list = document.createElement('ol');
  list.className = 'stops';
  for (const s of STOPS) {
    const li = document.createElement('li');
    li.className = 'stop';
    li.textContent = s;
    list.append(li);
  }
  el.append(head, list);
  el.classList.toggle('compact', preview);

  let sortable: Sortable | null = null;
  const editing = (): boolean => sortable !== null;
  const apply = (): void => {
    head.querySelector('.mode')!.textContent = editing() ? 'Editing: drag stops around' : 'Final plan (locked)';
    list.classList.toggle('editing', editing());
    toggle.textContent = editing() ? 'Done' : 'Edit';
  };
  const flip = (): void => {
    if (sortable) {
      sortable.destroy(); // all drag-and-drop behaviour is removed from the list
      sortable = null;
    } else {
      sortable = Sortable.create(list, { animation: 150, ghostClass: 'ghost' }); // and back on
    }
    apply();
  };
  const toggle = button(head, 'Edit', flip);
  sortable = Sortable.create(list, { animation: 150, ghostClass: 'ghost' });
  apply();

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Press Done, then try to drag a stop: nothing happens. Edit turns it back on.';
    el.append(hint);
  } else {
    loopDrive(el, signal, async (hand) => {
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 0.9);
      await hand.wait(0.3);
      flip(); // Done
      await hand.wait(0.4);
      await hand.drag(list.firstElementChild!, { el: list.lastElementChild!, fy: 0.8 }, 0.7); // no effect
      await hand.wait(0.5);
      flip(); // Edit again
    }, 0.6);
  }

  return () => {
    // A script is never mid-drag when it clicks Done, so destroy() above is safe; release() handles the rest.
    if (sortable) release(sortable);
  };
};

export default mount;
