// A gift wish list whose dragged copy looks the same on every device, or the browser's own picture
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, checkbox } from '../../shared/controls.ts';
import './style.css';

const GIFTS = ['Hiking boots', 'Espresso grinder', 'Film camera', 'Board game night', 'Record player'];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'list';
  for (const gift of GIFTS.slice(0, preview ? 4 : 5)) {
    const item = document.createElement('li');
    item.className = 'gift';
    item.textContent = gift;
    list.append(item);
  }
  el.append(list);

  // forceFallback: use Sortable's own floating copy instead of the browser's drag picture, and
  // fallbackClass names the class on that copy, so it can be styled to match the site.
  const create = (force: boolean): Sortable =>
    Sortable.create(list, {
      animation: 150,
      forceFallback: force,
      fallbackClass: 'floating',
      ghostClass: 'hole',
    });

  let sortable = create(true);

  if (preview) {
    loopDrive(el, signal, async (hand) => {
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 1.2);
    });
  } else {
    const controls = bar(el);
    el.prepend(controls);
    const note = document.createElement('p');
    note.className = 'hint';
    const describe = (force: boolean): void => {
      note.textContent = force
        ? 'forceFallback is on: you carry a styled copy (tilted, with a shadow) in every browser.'
        : 'forceFallback is off: the browser draws its own faded picture of the row, and it differs between browsers.';
    };
    describe(true);
    checkbox(controls, 'forceFallback', true, (v) => {
      // The drag mode is decided when a Sortable is created, so the option cannot be flipped on the fly:
      // build a fresh instance on the same list. (Nothing is being dragged while a checkbox is clicked.)
      sortable.destroy();
      sortable = create(v);
      describe(v);
    });
    el.append(note);
  }

  return () => release(sortable);
};

export default mount;
