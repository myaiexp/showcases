// A wrapping photo grid built from plain divs, with the direction Sortable finds on its own
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  // Any element can be a Sortable: a div of divs, no ul or li needed. Tiles are painted, not loaded.
  const grid = document.createElement('div');
  grid.className = 'grid';
  const count = preview ? 8 : 12;
  for (let i = 0; i < count; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.setProperty('--hue', String(Math.round((i * 360) / count + 20)));
    tile.style.setProperty('--tilt', `${(i * 37) % 60}deg`);
    tile.textContent = String(i + 1);
    grid.append(tile);
  }
  el.append(grid);

  // No `direction` given: with a grid of several columns, Sortable works out "horizontal" itself.
  const sortable = Sortable.create(grid, {
    animation: 150,
    ghostClass: 'ghost',
  });

  if (!preview) {
    const detect = (Sortable.utils as unknown as { detectDirection(el: HTMLElement): string }).detectDirection;
    const note = document.createElement('p');
    note.className = 'hint';
    note.textContent = `Sortable.utils.detectDirection(grid) says: ${detect(grid)}. Drag a photo anywhere in the grid.`;
    el.append(note);
  }

  if (preview) {
    // Throw the last photo to the front, again and again.
    loopDrive(el, signal, async (hand) => {
      await hand.drag(grid.lastElementChild!, { el: grid.firstElementChild!, fx: 0.3 }, 1.1);
    });
  }

  return () => release(sortable);
};

export default mount;
