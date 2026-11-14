// A chat list where pinned threads can't be passed, moved or displaced
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const THREADS = [
  { name: 'Mira', last: 'See you at 8!', pinned: true },
  { name: 'Mum', last: 'Call me back', pinned: true },
  { name: 'Climbing crew', last: 'Wall is open Sat', pinned: false },
  { name: 'Landlord', last: 'Boiler visit Tue', pinned: false },
  { name: 'Book club', last: 'Chapter 7 next', pinned: false },
];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'threads';
  for (const t of THREADS) {
    const li = document.createElement('li');
    li.className = t.pinned ? 'thread pinned' : 'thread';
    li.innerHTML = '<span class="avatar"></span><span class="who"><b></b><small></small></span><span class="pin">📌</span>';
    li.querySelector('.avatar')!.textContent = t.name[0]!;
    li.querySelector('b')!.textContent = t.name;
    li.querySelector('small')!.textContent = t.last;
    list.append(li);
  }
  const note = document.createElement('p');
  note.className = 'note';
  note.textContent = 'Pinned threads stay put';
  el.append(list, note);
  el.classList.toggle('compact', preview);

  let flash = 0;
  const refuse = (row: HTMLElement): void => {
    row.classList.add('refused');
    window.clearTimeout(flash);
    flash = window.setTimeout(() => row.classList.remove('refused'), 350);
  };

  const sortable = Sortable.create(list, {
    animation: 150,
    ghostClass: 'ghost',
    filter: '.pinned', // a pinned row can't be picked up at all
    // Called whenever the dragged row is about to swap places with `related`.
    // Returning false cancels that step, so nothing ever gets inserted above a pin.
    onMove: (evt) => {
      if (evt.related.classList.contains('pinned')) {
        refuse(evt.related);
        return false;
      }
      return true;
    },
  });

  if (!preview) {
    note.textContent = 'Try dragging a thread to the very top. It stops under the pins; the pinned rows flash red.';
  } else {
    // Try to push the last thread past the pins: it stops right below them.
    loopDrive(el, signal, async (hand) => {
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 1.1);
    }, 0.6);
  }

  return () => {
    window.clearTimeout(flash);
    release(sortable);
  };
};

export default mount;
