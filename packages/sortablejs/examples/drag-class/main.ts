// Sticky notes that lift off the board, tilted with a shadow, while you carry them
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const NOTES: [string, string][] = [
  ['Call the plumber', '#f6e58d'],
  ['Pick up parcel', '#c7ecee'],
  ['Birthday card for Ana', '#fab1a0'],
  ['Renew library books', '#b8e994'],
  ['Water the plants', '#d1c4ff'],
];

const mount: Mount = (el, { preview, signal }) => {
  const board = document.createElement('ul');
  board.className = 'board';
  for (const [text, color] of preview ? NOTES.slice(0, 4) : NOTES) {
    const note = document.createElement('li');
    note.className = 'note';
    note.style.setProperty('--paper', color);
    note.textContent = text;
    board.append(note);
  }
  el.append(board);

  // dragClass goes on the dragged element. A native drag takes its picture before the class is added,
  // but the floating copy a fallback drag makes carries it, so forceFallback gives every device the lift.
  const sortable = Sortable.create(board, {
    animation: 150,
    forceFallback: true,
    dragClass: 'lifted',
    ghostClass: 'hole',
  });

  if (preview) {
    loopDrive(el, signal, async (hand) => {
      await hand.drag(board.lastElementChild!, { el: board.firstElementChild!, fy: 0.2 }, 1.3);
    });
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Pick a note up: it tilts and casts a shadow while it travels.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
