// A photo grid that only picks a photo up after a long press, so swipes still scroll
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const HUES = [20, 45, 90, 150, 190, 220, 270, 320];

const mount: Mount = (el, { preview, signal }) => {
  const count = preview ? 6 : 8;
  const status = document.createElement('div');
  status.className = 'status';
  const grid = document.createElement('ul');
  grid.className = 'grid';
  HUES.slice(0, count).forEach((hue, i) => {
    const li = document.createElement('li');
    li.className = 'photo';
    li.style.setProperty('--hue', String(hue));
    li.textContent = String(i + 1);
    grid.append(li);
  });
  el.append(status, grid);
  status.textContent = 'Press and hold a photo';

  const sortable = Sortable.create(grid, {
    // The press must last this long before the photo lifts. A quicker swipe never grabs it.
    delay: 450,
    // While the press is held the photo gets this class: the "it is yours now" cue.
    chosenClass: 'held',
    ghostClass: 'ghost',
    animation: 150,
    onChoose: () => (status.textContent = 'Picked up'),
    onUnchoose: () => (status.textContent = 'Press and hold a photo'),
  });

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    slider(bar, 'delay', 0, 1500, 50, 450, (v) => sortable.option('delay', v), (v) => v + ' ms');
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'On a phone, swipe quickly to scroll and hold to move. With a mouse, press, wait for the glow, then drag.';
    el.append(bar, hint);
  } else {
    loopDrive(el, signal, async (hand) => {
      const first = grid.firstElementChild!;
      // A quick swipe: nothing is picked up.
      status.textContent = 'Quick swipe: ignored';
      await hand.drag(first, grid.children[4]!, 0.3);
      await hand.wait(0.5);
      // A long press: the photo glows, then follows the finger.
      await hand.drag(first, grid.children[4]!, 0.9, { hold: 0.7 });
    }, 0.6);
  }

  return () => release(sortable);
};

export default mount;
