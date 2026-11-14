// A swatch palette rearranged by code: toArray() reads the order, sort() applies one
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { bar, button } from '../../shared/controls.ts';
import { sleep } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const SWATCHES: [string, string][] = [
  ['Coral', '#ff7a66'],
  ['Amber', '#ffb347'],
  ['Lime', '#9be15d'],
  ['Teal', '#2ec4b6'],
  ['Sky', '#5bb7ff'],
  ['Plum', '#a569bd'],
];

const mount: Mount = (el, { preview, signal }) => {
  const grid = document.createElement('ul');
  grid.className = 'swatches';
  for (const [name, color] of SWATCHES) {
    const li = document.createElement('li');
    li.className = 'swatch';
    li.dataset['id'] = name; // toArray() reads this attribute
    li.style.setProperty('--c', color);
    li.textContent = name;
    grid.append(li);
  }
  el.append(grid);

  const sortable = Sortable.create(grid, { animation: 300, ghostClass: 'ghost' });
  const original = sortable.toArray(); // remember how it started

  // sort(order, true) rearranges the list to match `order`, animated.
  const reverse = (): void => sortable.sort(sortable.toArray().reverse(), true);
  const alphabetical = (): void => sortable.sort(sortable.toArray().sort(), true);
  const shuffle = (): void => {
    const order = sortable.toArray();
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j]!, order[i]!];
    }
    sortable.sort(order, true);
  };
  const restore = (): void => sortable.sort(original, true);

  if (!preview) {
    const row = bar(el);
    button(row, 'Reverse', reverse);
    button(row, 'A to Z', alphabetical);
    button(row, 'Shuffle', shuffle);
    button(row, 'Back to original', restore);
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag swatches by hand, then let the buttons rearrange them.';
    el.append(hint);
  } else {
    // No drags here: the card walks through the four buttons.
    const steps = [reverse, alphabetical, shuffle, restore];
    void (async () => {
      for (;;) {
        for (const step of steps) {
          step();
          await sleep(1.6, signal);
        }
      }
    })().catch(() => undefined);
  }

  return () => release(sortable);
};

export default mount;
