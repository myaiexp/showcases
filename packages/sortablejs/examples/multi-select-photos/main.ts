// A photo album where tapped photos are picked together and dragged as one
import Sortable, { MultiDrag } from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import './style.css';

const EMOJI = ['🌅', '🏔️', '🌊', '🌲', '🦊', '🚲', '🍜', '🎈', '🌷', '🛶', '🏰', '🐢'];

// MultiDrag is not in the default build: mount it once for the whole page.
mountOnce(new MultiDrag());

// MultiDrag keeps ONE selection for the whole page. A selection left behind by a card would be
// dragged into the next list that multi-drags, so cards always unpick everything when they finish.
const utils = Sortable.utils as typeof Sortable.utils & { deselect(el: HTMLElement): void };
const untick = (...lists: HTMLElement[]): void => {
  for (const list of lists) for (const row of list.children) utils.deselect(row as HTMLElement);
};

const mount: Mount = (el, { preview, signal }) => {
  const album = document.createElement('div');
  album.className = 'album';
  const grid = document.createElement('div');
  grid.className = 'grid';
  EMOJI.slice(0, preview ? 8 : 12).forEach((emoji, i) => {
    const photo = document.createElement('div');
    photo.className = 'photo';
    photo.style.setProperty('--hue', String(i * 31 + 10));
    photo.innerHTML = `<span class="pic">${emoji}</span><span class="name">IMG ${String(i + 1).padStart(2, '0')}</span>`;
    grid.append(photo);
  });
  album.append(grid);
  const status = document.createElement('p');
  status.className = 'readline';
  album.append(status);
  el.append(album);

  const sortable = Sortable.create(grid, {
    multiDrag: true, // tapping an item selects it instead of doing nothing
    draggable: '.photo', // a class, not the div default '>*': that one stops clicks outside from clearing the pick
    selectedClass: 'picked', // the class a selected photo wears
    animation: 150,
    onSelect: show,
    onDeselect: show,
    onEnd: show,
  });

  function show(): void {
    const n = grid.querySelectorAll('.picked').length;
    status.textContent = n ? `${n} photo${n > 1 ? 's' : ''} picked: drag one of them` : 'Tap photos to pick them';
  }
  show();

  if (preview) {
    // Pick three photos, drag them to the end of the album as a group, then click away to let go.
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const photos = [...grid.children].filter((c) => !c.classList.contains('sortable-fallback'));
      const picks = [1, 3, 5].map((k) => photos[(k + turn * 2) % photos.length]!);
      for (const p of picks) {
        await hand.tap(p);
        await hand.wait(0.25);
      }
      await hand.wait(0.3);
      await hand.drag(picks[1]!, { el: photos[photos.length - 1]!, fx: 0.8 }, 1.2);
      await hand.wait(1.1);
      // A tap on empty space clears the pick.
      hand.down(el, { x: 2, y: 2 });
      hand.up();
      turn++;
      untick(grid);
      show();
    }, 0.6);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Tap photos to pick them, then drag any picked photo. The others follow and unfold where you drop. Tap empty space to let go.';
    el.append(hint);
  }

  return () => {
    untick(grid);
    release(sortable);
  };
};

export default mount;
