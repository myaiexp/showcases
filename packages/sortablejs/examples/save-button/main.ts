// Dashboard widgets: the store only keeps an order when save() is called from a button
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const WIDGETS = ['Weather', 'Calendar', 'Notes', 'Stocks', 'Music'];

const mount: Mount = (el, { preview, signal }) => {
  const head = document.createElement('div');
  head.className = 'head';
  head.innerHTML = '<span class="flag"></span>';
  const list = document.createElement('ul');
  list.className = 'widgets';
  for (const w of WIDGETS) {
    const li = document.createElement('li');
    li.className = 'widget';
    li.dataset['id'] = w;
    li.textContent = w;
    list.append(li);
  }
  el.append(head, list);
  el.classList.toggle('compact', preview);

  let saved = [...WIDGETS]; // what "the server" holds
  let saving = false;
  const flag = head.querySelector('.flag')!;
  const mark = (): void => {
    const dirty = sortable.toArray().join() !== saved.join();
    flag.textContent = dirty ? '● Unsaved changes' : '✓ Saved';
    flag.classList.toggle('dirty', dirty);
  };

  const sortable: Sortable = Sortable.create(list, {
    animation: 150,
    ghostClass: 'ghost',
    store: {
      get: () => saved, // the order used when the list is first built
      // Sortable calls set() after every drop and from sortable.save(). Only a Save press may keep it.
      set: (s) => {
        if (saving) saved = s.toArray();
        mark();
      },
    },
  });
  mark();

  const save = (): void => {
    saving = true;
    sortable.save();
    saving = false;
    mark();
  };
  button(head, 'Save', save);
  button(head, 'Discard', () => {
    sortable.sort(saved, true); // back to the last saved order
    mark();
  });

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a widget: the marker turns orange. Save keeps the layout; Discard goes back to it.';
    el.append(hint);
  } else {
    loopDrive(el, signal, async (hand) => {
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 0.9);
      await hand.wait(0.8);
      save(); // what the Save button does
    }, 0.8);
  }

  return () => release(sortable);
};

export default mount;
