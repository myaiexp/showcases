// Three identical swatch columns that reorder at 0, 150 and 600 ms, side by side
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, button } from '../../shared/controls.ts';
import './style.css';

const SPEEDS = [0, 150, 600];
const COLORS = ['#e4572e', '#f3a712', '#a8c686', '#29b6d6', '#7b6cf6'];

const mount: Mount = (el, { preview, signal }) => {
  const cols = document.createElement('div');
  cols.className = 'cols';
  const lists = SPEEDS.map((ms) => {
    const col = document.createElement('section');
    col.innerHTML = '<h3></h3><ul class="list"></ul>';
    col.querySelector('h3')!.textContent = `${ms} ms`;
    const list = col.querySelector('ul')!;
    COLORS.slice(0, preview ? 4 : 5).forEach((color, i) => {
      const chip = document.createElement('li');
      chip.className = 'chip';
      chip.dataset['id'] = String(i + 1);
      chip.style.background = color;
      chip.textContent = String(i + 1);
      list.append(chip);
    });
    cols.append(col);
    return list;
  });
  el.append(cols);

  // `animation` is how long (ms) the other items take to slide aside. 0 is no animation at all.
  const sortables = lists.map((list, i) => Sortable.create(list, { animation: SPEEDS[i]! }));

  // sort(order, true) reorders from code and uses each list's own animation setting.
  const apply = (order: string[]): void => {
    for (const s of sortables) s.sort(order, true);
  };
  const reverse = (): void => apply(sortables[0]!.toArray().reverse());
  const shuffle = (): void => {
    const ids = sortables[0]!.toArray();
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j]!, ids[i]!];
    }
    apply(ids);
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(reverse, 1700);
    signal.addEventListener('abort', () => window.clearInterval(timer), { once: true });
  } else {
    const controls = bar(el);
    el.prepend(controls);
    button(controls, 'Shuffle all three', shuffle);
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'The same shuffle, three speeds. You can also drag a block in any column.';
    el.append(hint);
  }

  return () => {
    window.clearInterval(timer);
    release(...sortables);
  };
};

export default mount;
