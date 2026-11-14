// A file list whose rename and delete buttons work on a click without starting a drag
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const FILES = ['Budget.xlsx', 'Holiday.jpg', 'Notes.txt', 'Resume.pdf', 'Logo.svg', 'Demo.mp4', 'Taxes.pdf'];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'files';
  const file = (name: string): HTMLLIElement => {
    const li = document.createElement('li');
    li.className = 'file';
    li.innerHTML = '<span class="name"></span><button type="button" class="js-edit" title="Rename">✎</button><button type="button" class="js-remove" title="Delete">✕</button>';
    li.querySelector('.name')!.textContent = name;
    return li;
  };
  list.append(...FILES.slice(0, preview ? 4 : 6).map(file));
  el.append(list);

  const finishEdit = (name: HTMLElement): void => {
    name.contentEditable = 'false';
    name.textContent = name.textContent!.trim() || 'Untitled';
    sortable.option('disabled', false);
  };

  const sortable = Sortable.create(list, {
    animation: 150,
    ghostClass: 'ghost',
    // A press on these never starts a drag; onFilter gets it instead.
    filter: '.js-edit, .js-remove',
    onFilter(evt) {
      const row = evt.item;
      const button = evt.target;
      if (Sortable.utils.is(button, '.js-remove')) {
        row.remove();
      } else if (Sortable.utils.is(button, '.js-edit')) {
        const name = row.querySelector<HTMLElement>('.name')!;
        name.contentEditable = 'true';
        sortable.option('disabled', true); // no dragging while the name is being typed
        name.focus();
        window.getSelection()?.selectAllChildren(name);
        name.addEventListener('blur', () => finishEdit(name), { once: true });
        name.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            name.blur();
          }
        });
      }
    },
  });

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a row anywhere to reorder. Click the pencil to rename (Enter to finish) or the cross to delete.';
    el.append(hint);
  } else {
    let n = 4;
    loopDrive(el, signal, async (hand) => {
      // The cross deletes at once, even though a press anywhere else would start a drag.
      await hand.tap(list.children[1]!.querySelector('.js-remove')!, 0.2);
      await hand.wait(0.5);
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 0.9);
      list.append(file(FILES[n++ % FILES.length]!));
    }, 0.4);
  }

  return () => release(sortable);
};

export default mount;
