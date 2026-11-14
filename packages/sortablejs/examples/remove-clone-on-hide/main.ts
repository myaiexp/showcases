// A menu that hands out copies to an order tray, counting what a hidden copy leaves in the menu's DOM
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, checkbox, readout } from '../../shared/controls.ts';
import './style.css';

const DISHES = ['Ramen', 'Gyoza', 'Tempura', 'Mochi'];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const make = (title: string, items: string[]): HTMLUListElement => {
    const col = document.createElement('section');
    col.innerHTML = '<h3></h3><ul class="list"></ul>';
    col.querySelector('h3')!.textContent = title;
    const list = col.querySelector('ul')!;
    for (const name of items) {
      const li = document.createElement('li');
      li.className = 'dish';
      li.textContent = name;
      list.append(li);
    }
    wrap.append(col);
    return list;
  };
  const menu = make('Menu', DISHES.slice(0, preview ? 3 : 4));
  const tray = make('Order', []);
  const info = readout(el);
  info.classList.add('info');
  el.append(wrap, info);

  let peak = menu.childElementCount;
  const refresh = (): void => {
    // The fallback drag's floating copy is appended to the list too, so leave it out of the count.
    const kids = [...menu.children].filter((c) => c !== Sortable.ghost);
    const total = kids.length;
    const hidden = kids.filter((c) => (c as HTMLElement).style.display === 'none').length;
    peak = Math.max(peak, total);
    info.textContent = `Menu list in the DOM: ${total} (${hidden} hidden)\nMost during the last drag: ${peak}`;
  };
  const observer = new MutationObserver(refresh);
  observer.observe(menu, { childList: true, attributes: true, attributeFilter: ['style'], subtree: true });
  refresh();

  // The menu gives out clones. While the real dish is picked up, its stand-in copy is "hidden" until the
  // dish leaves the menu. removeCloneOnHide: true takes that copy out of the DOM; false only sets display: none.
  const menuSortable = Sortable.create(menu, {
    group: { name: 'dishes', pull: 'clone', put: false },
    sort: false,
    animation: 150,
    removeCloneOnHide: false, // keep the hidden copy in the DOM (display: none); the checkbox flips it
    ghostClass: 'hole',
    onStart: () => {
      peak = 0;
      refresh();
    },
  });
  const traySortable = Sortable.create(tray, { group: 'dishes', animation: 150, ghostClass: 'hole' });

  if (preview) {
    // Pick up a dish, hover over the menu long enough for the readout, then carry it to the tray.
    loopDrive(el, signal, async (hand) => {
      while (tray.childElementCount > 1) tray.firstElementChild!.remove();
      hand.down(menu.firstElementChild!);
      await hand.glide({ el: menu.children[1]!, fy: 0.9 }, 0.7);
      await hand.wait(0.5);
      await hand.glide(tray, 0.8);
      await hand.wait(0.15);
      hand.up();
    }, 0.6);
  } else {
    const controls = bar(el);
    el.prepend(controls);
    checkbox(controls, 'removeCloneOnHide', false, (v) => {
      menuSortable.option('removeCloneOnHide', v);
    });
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Pick up a dish and watch the count. Off: the hidden copy stays in the menu. On: it is taken out until needed.';
    el.append(hint);
  }

  return () => {
    observer.disconnect();
    release(menuSortable, traySortable);
  };
};

export default mount;
