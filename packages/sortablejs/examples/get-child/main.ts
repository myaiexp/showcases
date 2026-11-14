// A menu with headings: getChild() counts only draggable dishes, index() reports a dish's number
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

// getChild and index are documented in the README but missing from the package's typings.
const U = Sortable.utils as unknown as {
  getChild(el: HTMLElement, childNum: number, options: Sortable.Options, includeDragEl?: boolean): HTMLElement | null;
  index(el: HTMLElement, selector?: string): number;
};

const MENU = ['Starters', 'Soup', 'Bruschetta', 'Mains', 'Lasagne', 'Curry', 'Dessert', 'Tiramisu'];
const HEADINGS = new Set(['Starters', 'Mains', 'Dessert']);

const mount: Mount = (el, { preview, signal }) => {
  const chips = document.createElement('div');
  chips.className = 'chips';
  const list = document.createElement('ul');
  list.className = 'menu';
  for (const name of MENU) {
    const li = document.createElement('li');
    li.className = HEADINGS.has(name) ? 'heading' : 'dish';
    li.textContent = name;
    list.append(li);
  }
  const answer = document.createElement('p');
  answer.className = 'answer';
  el.append(chips, list, answer);
  el.classList.toggle('compact', preview);

  const sortable = Sortable.create(list, {
    draggable: '.dish', // headings are not draggable, so they are not counted either
    animation: 150,
    ghostClass: 'ghost',
  });

  let marked: HTMLElement | null = null;
  const pick = (n: number): void => {
    marked?.classList.remove('picked');
    // The nth draggable item (counting from 0), ignoring headings.
    const dish = U.getChild(list, n, sortable.options);
    marked = dish;
    dish?.classList.add('picked');
    chips.querySelectorAll('button').forEach((b, i) => b.classList.toggle('on', i === n));
    if (!dish) return void (answer.textContent = 'There is no such dish');
    // index(el, selector) is the dish's own number; the plain child index counts headings too.
    const dishNo = U.index(dish, '.dish') + 1;
    const rowNo = [...list.children].indexOf(dish) + 1;
    answer.textContent = preview
      ? `Dish #${dishNo}: ${dish.textContent} (row ${rowNo})`
      : `Dish #${dishNo} is ${dish.textContent} (row ${rowNo} counting headings)`;
  };
  for (let i = 0; i < 5; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = `#${i + 1}`;
    b.addEventListener('click', () => pick(i));
    chips.append(b);
  }
  pick(2);

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Pick a number, then drag dishes around and pick again: the answer follows the new order.';
    el.append(hint);
  } else {
    let n = 0;
    loopDrive(el, signal, async (hand) => {
      pick(n++ % 5);
      await hand.wait(0.7);
      if (n % 2 === 0) await hand.drag(list.lastElementChild!, { el: list.querySelector('.dish')!, fy: 0.2 }, 0.9);
    }, 0.2);
  }

  return () => release(sortable);
};

export default mount;
