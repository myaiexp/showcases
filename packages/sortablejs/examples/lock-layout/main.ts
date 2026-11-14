// A dashboard whose tiles are locked until the "Edit layout" switch is turned on
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const TILES: [string, string, number][] = [
  ['Sales', '$4.2k', 2],
  ['Visitors', '1,204', 1],
  ['Orders', '86', 1],
  ['Uptime', '99.9%', 1],
  ['Support', '3', 1],
  ['Rating', '4.8', 1],
];

const mount: Mount = (el, { preview, signal }) => {
  const head = document.createElement('div');
  head.className = 'head';
  head.innerHTML = '<strong>Dashboard</strong><button type="button" class="switch" role="switch" aria-checked="false"><span class="knob"></span><span class="word">Edit layout</span></button>';
  const toggle = head.querySelector<HTMLButtonElement>('.switch')!;
  const grid = document.createElement('div');
  grid.className = 'tiles';
  for (const [name, value, span] of preview ? TILES.slice(0, 5) : TILES) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.gridColumn = 'span ' + span;
    tile.innerHTML = '<small></small><b></b>';
    tile.querySelector('small')!.textContent = name;
    tile.querySelector('b')!.textContent = value;
    grid.append(tile);
  }
  el.append(head, grid);

  const sortable = Sortable.create(grid, {
    animation: 150,
    ghostClass: 'ghost',
    disabled: true, // the layout starts locked
  });

  // option('disabled') reads the current state, option('disabled', value) changes it.
  const sync = (): void => {
    const editing = !sortable.option('disabled');
    toggle.setAttribute('aria-checked', String(editing));
    grid.classList.toggle('editing', editing);
  };
  const setEditing = (on: boolean): void => {
    sortable.option('disabled', !on);
    sync();
  };
  sync();

  if (!preview) {
    toggle.addEventListener('click', () => setEditing(!!sortable.option('disabled')));
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Locked, the tiles stay put even if you drag them. Turn on Edit layout to rearrange, then switch it off to lock your layout.';
    el.append(hint);
  } else {
    loopDrive(el, signal, async (hand) => {
      // Locked: the drag does nothing.
      setEditing(false);
      await hand.wait(0.3);
      await hand.drag(grid.lastElementChild!, grid.firstElementChild!, 0.7);
      await hand.wait(0.3);
      // Unlocked: the same drag moves the tile.
      setEditing(true);
      await hand.wait(0.4);
      await hand.drag(grid.lastElementChild!, { el: grid.firstElementChild!, fx: 0.2 }, 0.9);
      await hand.wait(0.4);
    }, 0.2);
  }

  return () => release(sortable);
};

export default mount;
