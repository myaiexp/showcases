// A shelf and a cart: onAdd and onRemove keep the total and item count current
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const GOODS = [
  { name: 'Bread', glyph: '🍞', price: 3.2 },
  { name: 'Cheese', glyph: '🧀', price: 6.5 },
  { name: 'Apples', glyph: '🍎', price: 2.4 },
  { name: 'Coffee', glyph: '☕', price: 8.9 },
  { name: 'Eggs', glyph: '🥚', price: 4.1 },
];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'shop';
  wrap.innerHTML =
    '<section><h3>Shelf</h3><ul class="goods shelf"></ul></section>' +
    '<section class="cart-box"><h3>Cart</h3><ul class="goods cart"></ul><p class="sum"><span class="count"></span><b class="total"></b></p></section>';
  const shelf = wrap.querySelector<HTMLUListElement>('.shelf')!;
  const cart = wrap.querySelector<HTMLUListElement>('.cart')!;
  for (const g of GOODS) {
    const li = document.createElement('li');
    li.className = 'good';
    li.dataset['price'] = String(g.price);
    li.innerHTML = '<span class="glyph"></span><span class="name"></span><span class="price"></span>';
    li.querySelector('.glyph')!.textContent = g.glyph;
    li.querySelector('.name')!.textContent = g.name;
    li.querySelector('.price')!.textContent = `€${g.price.toFixed(2)}`;
    shelf.append(li);
  }
  el.append(wrap);

  // The cart starts with one item so the numbers aren't zero.
  let total = 0;
  let count = 0;
  const show = (): void => {
    wrap.querySelector('.count')!.textContent = `${count} item${count === 1 ? '' : 's'}`;
    wrap.querySelector('.total')!.textContent = `€${total.toFixed(2)}`;
  };
  const price = (e: Sortable.SortableEvent): number => Number(e.item.dataset['price']);
  const first = shelf.firstElementChild as HTMLElement;
  cart.append(first);
  total = Number(first.dataset['price']);
  count = 1;
  show();

  const sortables = [
    Sortable.create(shelf, { group: 'shop', animation: 150, ghostClass: 'ghost' }),
    Sortable.create(cart, {
      group: 'shop',
      animation: 150,
      ghostClass: 'ghost',
      onAdd: (e) => { // something was dropped into the cart
        total += price(e);
        count++;
        show();
      },
      onRemove: (e) => { // something was taken out of it
        total -= price(e);
        count--;
        show();
      },
    }),
  ];

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag items into the cart, and back out again to put them on the shelf.';
    el.append(hint);
  } else {
    let step = 0;
    loopDrive(el, signal, async (hand) => {
      // Fill the cart, then empty it one item at a time.
      const filling = shelf.children.length > 2 || (step++ % 6 < 3 && shelf.children.length > 0);
      if (filling && shelf.firstElementChild) await hand.drag(shelf.firstElementChild, { el: cart, fy: 0.3 }, 0.9);
      else await hand.drag(cart.firstElementChild!, { el: shelf, fy: 0.3 }, 0.9);
    }, 0.5);
  }

  return () => release(...sortables);
};

export default mount;
