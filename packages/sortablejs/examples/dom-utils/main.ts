// A packing list built only on Sortable.utils helpers for events, lookups and classes
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

// The package's typings leave out a few helpers that the README documents.
const U = Sortable.utils as Sortable.Utils & {
  index(el: HTMLElement, selector?: string): number;
  clone(el: HTMLElement): HTMLElement;
};

const ITEMS = ['Passport', 'Charger', 'Rain jacket', 'Sunscreen', 'Camera'];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'pack';
  for (const name of ITEMS) {
    const li = document.createElement('li');
    li.className = 'row';
    li.textContent = name;
    list.append(li);
  }
  const status = document.createElement('p');
  status.className = 'info';
  el.append(list, status);
  el.classList.toggle('compact', preview);

  const sortable = Sortable.create(list, { animation: 150, ghostClass: 'ghost' });
  let last: HTMLElement | null = null;

  const summary = (): void => {
    let packed = 0;
    // find() lists every <li> in the list; is() tests each against a selector.
    U.find(list, 'li', (row) => {
      if (U.is(row, '.packed')) packed++;
    });
    const where = last ? `, last touched: "${last.textContent}" (row ${U.index(last, '.row') + 1})` : '';
    status.textContent = `${packed} of ${U.find(list, 'li').length} packed${where}`;
  };

  // on() attaches the listener; one on the list covers every row.
  const onClick = (e: Event): void => {
    // closest() climbs from whatever was clicked up to its row.
    const row = U.closest(e.target as HTMLElement, '.row', list);
    if (!row) return;
    U.toggleClass(row, 'packed', !U.is(row, '.packed')); // tick or untick
    U.css(row, 'borderColor', 'var(--accent)'); // css() sets a style property directly...
    window.setTimeout(() => U.css(row, 'borderColor', ''), 300);
    last = row;
    summary();
  };
  U.on(list, 'click', onClick);
  summary();

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    // clone() makes a deep copy of an element: handy for "pack two of these".
    button(bar, 'Duplicate last touched', () => {
      if (!last) return;
      const copy = U.clone(last);
      U.toggleClass(copy, 'packed', false);
      last.after(copy);
      summary();
    });
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Click an item to tick it off, drag to reorder.';
    el.append(bar, hint);
  } else {
    let n = 0;
    loopDrive(el, signal, async (hand) => {
      const row = list.children[n++ % list.children.length] as HTMLElement;
      await hand.wait(0.5);
      onClick({ target: row } as unknown as Event); // a real click would bubble to the card's link
      await hand.wait(0.6);
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 0.9);
      if (n % 5 === 0) for (const r of list.children) U.toggleClass(r as HTMLElement, 'packed', false);
    }, 0.3);
  }

  return () => {
    U.off(list, 'click', onClick); // off() detaches it again
    release(sortable);
  };
};

export default mount;
