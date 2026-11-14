// A menu that hands out copies but stays in order, next to an order that can be sorted
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const DISHES: [string, number][] = [
  ['Soup', 6],
  ['Salad', 7],
  ['Pasta', 12],
  ['Steak', 21],
  ['Cake', 8],
];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'cafe';
  wrap.innerHTML =
    '<section class="box"><h3>Menu</h3><ul class="menu"></ul></section>' +
    '<section class="box"><h3>Your order <span class="total"></span></h3><ul class="order"></ul></section>';
  const menu = wrap.querySelector<HTMLUListElement>('.menu')!;
  const order = wrap.querySelector<HTMLUListElement>('.order')!;
  const total = wrap.querySelector('.total')!;
  const dish = ([name, price]: [string, number]): HTMLLIElement => {
    const li = document.createElement('li');
    li.className = 'dish';
    li.dataset['price'] = String(price);
    li.innerHTML = '<span></span><b></b>';
    li.firstElementChild!.textContent = name;
    li.lastElementChild!.textContent = '$' + price;
    return li;
  };
  menu.append(...DISHES.map(dish));
  el.append(wrap);

  const sum = (): void => {
    const money = [...order.children].reduce((acc, li) => acc + Number((li as HTMLElement).dataset['price']), 0);
    total.textContent = '$' + money;
  };
  sum();

  // The menu: copies come out, nothing goes in, and sort: false keeps the dishes where they are.
  const menuSortable = Sortable.create(menu, {
    group: { name: 'cafe', pull: 'clone', put: false },
    sort: false,
    animation: 150,
  });
  // The order: dishes can be reordered, e.g. to serve the cake first.
  const orderSortable = Sortable.create(order, {
    group: { name: 'cafe', pull: true, put: true },
    animation: 150,
    ghostClass: 'ghost',
    onSort: sum,
  });

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    checkbox(bar, 'Let the menu be rearranged (sort: true)', false, (on) => menuSortable.option('sort', on));
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Try shuffling the menu: nothing moves. Shuffle your order: it does.';
    el.append(bar, hint);
  } else {
    let n = 0;
    loopDrive(el, signal, async (hand) => {
      if (n % 3 === 2) {
        // Dragging inside the menu goes nowhere: the dish snaps back.
        await hand.drag(menu.children[0]!, menu.lastElementChild!, 0.8);
      } else {
        const last = order.lastElementChild;
        await hand.drag(menu.children[1 + (n % 4)]!, last ? { el: last, fy: 0.8 } : order, 0.9);
        if (order.children.length > 3) order.firstElementChild!.remove();
        sum();
      }
      n++;
    }, 0.4);
  }

  return () => release(menuSortable, orderSortable);
};

export default mount;
