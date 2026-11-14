// A playlist whose rows show their swap zone, with a slider for how deep a drag must go
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, slider } from '../../shared/controls.ts';
import './style.css';

const SONGS = ['Morning Light', 'Paper Planes', 'Night Drive', 'Slow Burn', 'Harbour Lights'];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'list';
  for (const [i, song] of SONGS.slice(0, preview ? 4 : 5).entries()) {
    const row = document.createElement('li');
    row.className = 'song';
    row.innerHTML = '<i class="zone"></i><span class="no"></span><span class="name"></span>';
    row.querySelector('.no')!.textContent = String(i + 1);
    row.querySelector('.name')!.textContent = song;
    list.append(row);
  }
  const setZone = (v: number): void => list.style.setProperty('--zone', String(v));
  setZone(0.5);

  // swapThreshold is the share of a row (0 to 1) that counts as "over it". Only a drag that reaches
  // the shaded middle of a row makes the rows trade places; the rest of the row is a dead margin.
  const sortable = Sortable.create(list, {
    animation: 150,
    swapThreshold: 0.5,
    ghostClass: 'ghost',
  });

  if (preview) {
    // Carry the last song up into the first one's shaded middle, again and again.
    loopDrive(el, signal, async (hand) => {
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.5 }, 1.1);
    });
  } else {
    const controls = bar(el);
    slider(controls, 'swapThreshold', 0.1, 1, 0.05, 0.5, (v) => {
      sortable.option('swapThreshold', v); // read on every drag-over, so it changes live
      setZone(v);
    }, (v) => v.toFixed(2));
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'The shaded band is where a dragged song must reach before rows swap. Small bands feel stubborn, 1.00 swaps on first touch.';
    el.append(hint);
  }
  el.append(list);

  return () => release(sortable);
};

export default mount;
