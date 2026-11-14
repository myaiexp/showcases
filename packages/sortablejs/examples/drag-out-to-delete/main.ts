// Interest tags that disappear when you drag them out of the box, with Undo and Restock
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const TAGS = ['jazz', 'hiking', 'cooking', 'chess', 'travel', 'film', 'gardening'];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.innerHTML = '<p class="title">Your interests</p><ul class="tags"></ul><div class="row"><span class="note"></span></div>';
  const list = wrap.querySelector<HTMLElement>('.tags')!;
  const note = wrap.querySelector<HTMLElement>('.note')!;
  const row = wrap.querySelector<HTMLElement>('.row')!;
  const make = (text: string): HTMLElement => {
    const tag = document.createElement('li');
    tag.className = 'tag';
    tag.textContent = text;
    return tag;
  };
  const restock = (): void => {
    list.replaceChildren(...TAGS.slice(0, preview ? 5 : 7).map(make));
    note.textContent = 'Drag a tag out of the box to delete it';
  };
  restock();
  el.append(wrap);

  const removed: { tag: HTMLElement; index: number }[] = [];
  const sortable = Sortable.create(list, {
    animation: 150,
    removeOnSpill: true, // a tag dropped outside the box is taken out of the page
    onSpill(evt) {
      // Fires just before the removal, so the tag and its old position are still known.
      removed.push({ tag: evt.item, index: evt.oldIndex! });
      note.textContent = `Deleted "${evt.item.textContent}"`;
    },
  });

  const undo = (): void => {
    const last = removed.pop();
    if (!last) return;
    list.insertBefore(last.tag, list.children[last.index] ?? null);
    last.tag.animate([{ transform: 'scale(0.4)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 250, easing: 'ease-out' });
    note.textContent = `Brought back "${last.tag.textContent}"`;
  };

  if (preview) {
    const canvas = wrap;
    loopDrive(el, signal, async (hand) => {
      const tags = [...list.children].filter((c) => !c.classList.contains('sortable-fallback'));
      // Drag a tag well outside the box (down into the empty space under it), watch it vanish, then undo.
      await hand.drag(tags[1]!, { el: canvas, fx: 0.5, fy: 0.97 }, 1);
      await hand.wait(1);
      undo();
      await hand.wait(0.8);
    }, 0.3);
  } else {
    button(row, 'Undo', undo);
    button(row, 'Restock', () => {
      removed.length = 0;
      restock();
    });
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a tag out of the box and let go: it is gone. Undo brings back the last one. Tags can still be reordered inside the box.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
