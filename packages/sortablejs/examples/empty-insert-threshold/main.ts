// Laundry baskets that catch a dragged item from some distance away, with the catch zone drawn
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, button, slider } from '../../shared/controls.ts';
import './style.css';

const CLOTHES = ['Socks', 'Shirt', 'Towel', 'Jeans'];

const mount: Mount = (el, { preview, signal }) => {
  const start = preview ? 22 : 40; // a smaller halo so two fit in the card
  const stage = document.createElement('div');
  stage.className = preview ? 'stage' : 'stage roomy'; // room for halos up to 60 px
  stage.style.setProperty('--reach', String(start));
  const pile = document.createElement('ul');
  pile.className = 'pile';
  for (const name of CLOTHES.slice(0, preview ? 3 : 4)) {
    const item = document.createElement('li');
    item.className = 'cloth';
    item.textContent = name;
    pile.append(item);
  }
  const baskets = ['Whites', 'Colours'].map((title) => {
    const box = document.createElement('div');
    box.className = 'basket';
    box.innerHTML = '<h3></h3><ul class="inside"></ul>'; // no whitespace inside the ul: :empty must match
    box.querySelector('h3')!.textContent = title;
    return box;
  });
  const column = document.createElement('div');
  column.className = 'baskets';
  column.append(...baskets);
  stage.append(pile, column);
  el.append(stage);

  // An empty list only takes a drop when the pointer is over it, unless emptyInsertThreshold gives it a
  // reach: the pointer may be this many px away from the empty list and the dragged item still goes in.
  // The dashed halo is that reach, and it vanishes once a basket has something in it.
  const lists = [pile, ...baskets.map((b) => b.querySelector('ul')!)];
  const sortables = lists.map((list) =>
    Sortable.create(list, {
      group: 'laundry',
      animation: 150,
      emptyInsertThreshold: start,
      ghostClass: 'hole',
      fallbackOnBody: !preview,
    }),
  );
  const reach = (px: number): void => {
    stage.style.setProperty('--reach', String(px));
    for (const s of sortables) s.option('emptyInsertThreshold', px);
  };

  if (preview) {
    // Stop 16 px short of the first basket (inside its halo), then bring the item back.
    loopDrive(el, signal, async (hand) => {
      const basket = lists[1]!;
      const near = (): { x: number; y: number } => {
        const b = basket.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return { x: b.left - r.left - 16, y: b.top - r.top + b.height / 2 };
      };
      await hand.drag(pile.firstElementChild!, near(), 1.1);
      await hand.wait(0.5);
      await hand.drag(basket.firstElementChild ?? basket, pile.firstElementChild!, 1);
    }, 0.4);
  } else {
    const controls = bar(el);
    el.prepend(controls);
    slider(controls, 'emptyInsertThreshold', 0, 60, 5, 40, reach, (v) => `${v} px`);
    button(controls, 'Empty the baskets', () => {
      for (const list of lists.slice(1)) pile.append(...list.children);
    });
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag an item toward a basket without touching it. Inside the dashed halo it drops in; outside, nothing happens.';
    el.append(hint);
  }

  return () => release(...sortables);
};

export default mount;
