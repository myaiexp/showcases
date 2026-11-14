// A wedding table where dropping a guest on another guest swaps their seats
import Sortable, { Swap } from 'sortablejs';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import './style.css';

const GUESTS = [
  ['🧑‍🍳', 'Marta'],
  ['👴', 'Grandpa Joe'],
  ['🧑‍🎤', 'Kai'],
  ['👩‍🏫', 'Ms. Okoye'],
  ['🧑‍🚀', 'Luis'],
  ['👵', 'Aunt Rosa'],
] as const;

// Swap is not in the default build: mount it once for the whole page.
mountOnce(new Swap());

const mount: Mount = (el, { preview, signal }) => {
  const table = document.createElement('div');
  table.className = 'table';
  const seats = document.createElement('div');
  seats.className = 'seats';
  for (const [face, name] of GUESTS) {
    const guest = document.createElement('div');
    guest.className = 'guest';
    guest.innerHTML = `<span class="face">${face}</span><span class="who">${name}</span>`;
    seats.append(guest);
  }
  table.append(seats);
  el.append(table);

  const sortable = Sortable.create(seats, {
    swap: true, // dropping on a guest trades places instead of shifting everyone between
    swapClass: 'target-seat', // lights up the guest you would trade with
    draggable: '.guest',
    animation: 200,
    ghostClass: 'lifted',
  });

  if (preview) {
    // Three different swaps, round and round.
    const pairs: [number, number][] = [[0, 5], [1, 3], [2, 4]];
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const [a, b] = pairs[turn++ % pairs.length]!;
      const guests = [...seats.children].filter((c) => c.classList.contains('guest') && !c.classList.contains('sortable-fallback'));
      await hand.drag(guests[a]!, guests[b]!, 1.1);
    }, 0.6);
  } else {
    const bar = document.createElement('div');
    bar.style.cssText = 'display:flex;justify-content:center;padding:10px 0 2px';
    // Switch between the two behaviours on the same list.
    checkbox(bar, 'Swap mode (off: everyone shifts, like a normal sortable list)', true, (on) => sortable.option('swap', on));
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a guest over another one: only the guest underneath lights up, and the two trade seats when you let go.';
    el.append(bar, hint);
  }

  return () => release(sortable);
};

export default mount;
