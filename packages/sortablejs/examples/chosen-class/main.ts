// A team line-up where a half-second press highlights the player you are about to move
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const PLAYERS = ['Maya (goal)', 'Jonas (defence)', 'Priya (midfield)', 'Leo (wing)', 'Sofia (striker)'];

const mount: Mount = (el, { preview, signal }) => {
  const status = document.createElement('div');
  status.className = 'status';
  const idle = preview ? 'press and hold...' : 'Press and hold a player for half a second to pick them up.';
  status.textContent = idle;
  const list = document.createElement('ul');
  list.className = 'list';
  for (const name of PLAYERS.slice(0, preview ? 4 : 5)) {
    const row = document.createElement('li');
    row.className = 'player';
    row.textContent = name;
    list.append(row);
  }
  el.append(status, list);

  // The README pairs the two options: with a delay the row is not "chosen" until the press has been
  // held that long, so chosenClass is the visible signal that the pick-up worked.
  const sortable = Sortable.create(list, {
    delay: 500,
    chosenClass: 'picked',
    animation: 150,
    ghostClass: 'slot',
    onChoose: (evt) => {
      status.textContent = `${evt.item.textContent} is picked up`;
    },
    onUnchoose: () => {
      status.textContent = idle;
    },
  });

  if (preview) {
    // Hold the last player for the delay, then move him to the front.
    loopDrive(el, signal, async (hand) => {
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 1, { hold: 0.8 });
    }, 0.6);
  }

  return () => release(sortable);
};

export default mount;
