// A shopping basket whose quantity fields stay usable inside draggable rows
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const ITEMS: [string, number][] = [
  ['Oat milk', 2],
  ['Sourdough', 5],
  ['Tomatoes', 3],
  ['Coffee beans', 9],
];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'basket';
  for (const [name, price] of ITEMS) {
    const li = document.createElement('li');
    li.className = 'line';
    li.dataset['price'] = String(price);
    li.innerHTML = '<span class="name"></span><input class="qty" type="number" min="0" max="99" value="1" aria-label="Quantity"><span class="sum"></span>';
    li.querySelector('.name')!.textContent = name;
    list.append(li);
  }
  const total = document.createElement('div');
  total.className = 'total';
  el.append(list, total);

  const update = (): void => {
    let money = 0;
    for (const li of list.children as HTMLCollectionOf<HTMLElement>) {
      const line = Number(li.dataset['price']) * Number(li.querySelector<HTMLInputElement>('.qty')!.value || 0);
      li.querySelector('.sum')!.textContent = '$' + line;
      money += line;
    }
    total.textContent = 'Total $' + money;
  };
  list.addEventListener('input', update);
  update();

  const sortable = Sortable.create(list, {
    animation: 150,
    ghostClass: 'ghost',
    // A press on a field belongs to the field: the row does not start dragging...
    filter: (_evt, target) => target.matches('input'),
    // ...and the press is left alone (the default is to call preventDefault on it), so the field behaves like any form field.
    preventOnFilter: false,
  });

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Type a quantity, or click into a field and select its number. Drag a row by its name to reorder.';
    el.append(hint);
  } else {
    let n = 0;
    loopDrive(el, signal, async (hand) => {
      // Someone types a new quantity, then rearranges the basket.
      const input = list.children[n % list.children.length]!.querySelector<HTMLInputElement>('.qty')!;
      await hand.tap(input, 0.15);
      input.value = String(1 + ((n * 2 + 1) % 4));
      list.dispatchEvent(new Event('input'));
      n++;
      await hand.wait(0.5);
      await hand.drag(list.lastElementChild!.querySelector('.name')!, { el: list.firstElementChild!, fy: 0.2 }, 0.9);
    }, 0.4);
  }

  return () => release(sortable);
};

export default mount;
