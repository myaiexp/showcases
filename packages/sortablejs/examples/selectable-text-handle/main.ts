// A list of copyable notes: a drag handle keeps their text selectable
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const NOTES: [string, string][] = [
  ['Wi-Fi', 'guest / sunny-42'],
  ['Door code', '4 8 1 5 #'],
  ['Parcel shelf', 'Second drawer, left'],
  ['Spare key', 'Under the blue pot'],
];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'notes';
  for (const [title, text] of NOTES.slice(0, preview ? 3 : 4)) {
    const li = document.createElement('li');
    li.className = 'note';
    li.innerHTML = '<span class="grip" aria-hidden="true">⠿</span><div><b></b><span class="text"></span></div>';
    li.querySelector('b')!.textContent = title;
    li.querySelector('.text')!.textContent = text;
    list.append(li);
  }
  el.append(list);

  const sortable = Sortable.create(list, {
    // Without a handle the whole row is a drag area, and pressing on its text starts a drag
    // instead of a selection. With one, only the grip drags and the text can be selected.
    handle: '.grip',
    animation: 150,
    ghostClass: 'ghost',
  });

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    // option(name, value) changes a setting on the live list; an empty handle means "drag anywhere".
    checkbox(bar, 'Use the grip as a handle', true, (on) => {
      sortable.option('handle', on ? '.grip' : '');
      list.classList.toggle('no-handle', !on);
    });
    const picked = readout(el, 'Selected text: (none)');
    document.addEventListener('selectionchange', onSelection);
    function onSelection(): void {
      const text = window.getSelection()?.toString().trim() ?? '';
      picked.textContent = 'Selected text: ' + (text ? text.slice(0, 60) : '(none)');
    }
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Select a code with the mouse, then untick the handle and try again: the row gets dragged instead.';
    el.append(bar, picked, hint);
    return () => {
      document.removeEventListener('selectionchange', onSelection);
      release(sortable);
    };
  }

  loopDrive(el, signal, async (hand) => {
    // The grip is the only part that drags; the code in the row is plain selectable text.
    await hand.drag(list.lastElementChild!.querySelector('.grip')!, { el: list.firstElementChild!, fy: 0.2 }, 1);
  });

  return () => release(sortable);
};

export default mount;
