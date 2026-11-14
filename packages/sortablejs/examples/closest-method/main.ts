// A guest list with one delegated click listener: sortable.closest() finds the row
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const GUESTS = ['Amara', 'Bruno', 'Chloe', 'Dmitri'];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'guests';
  for (const g of GUESTS) {
    const li = document.createElement('li');
    li.className = 'guest';
    li.innerHTML = '<span class="who"><b class="nm"></b><i class="extra"></i></span><button type="button" class="plus">+1</button><button type="button" class="drop">✕</button>';
    li.querySelector('.nm')!.textContent = g;
    list.append(li);
  }
  const readout = document.createElement('p');
  readout.className = 'readout';
  readout.textContent = 'Click a button on any row';
  el.append(list, readout);
  el.classList.toggle('compact', preview);

  const sortable = Sortable.create(list, { animation: 150, ghostClass: 'ghost', draggable: '.guest' });

  // One listener for the whole list. The click lands on a button; closest() climbs from there
  // to the draggable row (the default selector is the `draggable` option).
  const onClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const row = sortable.closest(target);
    if (!row) return;
    const name = row.querySelector('.nm')!.textContent;
    const what = target.closest('button')?.className;
    readout.textContent = `Click on <${target.tagName.toLowerCase()}.${target.className || 'row'}> belongs to ${name}'s row`;
    if (what === 'plus') row.querySelector('.extra')!.textContent = ' +1';
    if (what === 'drop') row.remove();
  };
  list.addEventListener('click', onClick);

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Click +1 or the cross on a row, or the name itself. You can still drag rows around.';
    el.append(hint);
  } else {
    let n = 0;
    loopDrive(el, signal, async (hand) => {
      const rows = [...list.children];
      const row = rows[n++ % rows.length]!;
      await hand.wait(0.5);
      // A real click would bubble up to the card's link, so hand the listener the click target.
      onClick({ target: row.querySelector('.plus') } as unknown as Event);
      await hand.wait(0.9);
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 0.9);
      row.querySelector('.extra')!.textContent = '';
    }, 0.3);
  }

  return () => {
    list.removeEventListener('click', onClick);
    release(sortable);
  };
};

export default mount;
