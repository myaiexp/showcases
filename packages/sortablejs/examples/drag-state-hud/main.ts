// A recipe library and a menu with a HUD reading Sortable's static drag properties
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const RECIPES = ['Ramen', 'Shakshuka', 'Pad thai'];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'kitchen compact' : 'kitchen';
  wrap.innerHTML =
    '<div class="cols"><section><h3>Library</h3><ul class="recipes library" data-name="Library"></ul></section>' +
    '<section><h3>Tonight</h3><ul class="recipes menu" data-name="Tonight"></ul></section></div>' +
    '<dl class="hud"><dt>Sortable.active</dt><dd></dd><dt>Sortable.dragged</dt><dd></dd><dt>Sortable.ghost</dt><dd></dd><dt>Sortable.clone</dt><dd></dd></dl>';
  const library = wrap.querySelector<HTMLUListElement>('.library')!;
  const menu = wrap.querySelector<HTMLUListElement>('.menu')!;
  const cells = [...wrap.querySelectorAll('dd')];
  for (const r of RECIPES) {
    const li = document.createElement('li');
    li.className = 'recipe';
    li.textContent = r;
    library.append(li);
  }
  el.append(wrap);

  // Read the four static properties on every frame. Outside a drag they are all null.
  let frame = 0;
  const read = (): void => {
    // The statics are page-wide: ignore a drag that belongs to some other list on the page.
    const mine = Sortable.active && wrap.contains(Sortable.active.el);
    const active = mine ? Sortable.active : null;
    const dragged = mine ? Sortable.dragged : null;
    const ghost = mine ? Sortable.ghost : null;
    const clone = mine ? Sortable.clone : null;
    const text = (e: HTMLElement | null): string => (e ? `<li> "${e.textContent}"` : 'null');
    cells[0]!.textContent = active ? `the ${active.el.dataset['name']} list` : 'null';
    cells[1]!.textContent = text(dragged);
    cells[2]!.textContent = ghost ? `floating at ${Math.round(ghost.getBoundingClientRect().left)}, ${Math.round(ghost.getBoundingClientRect().top)}` : 'null';
    cells[3]!.textContent = text(clone);
    frame = requestAnimationFrame(read);
  };
  read();

  const sortables = [
    // The library copies out instead of moving, which is what creates Sortable.clone.
    Sortable.create(library, { group: { name: 'menu', pull: 'clone', put: false }, sort: false, animation: 150, forceFallback: true }),
    // forceFallback gives mouse drags a floating copy too; without it Sortable.ghost stays null.
    Sortable.create(menu, { group: 'menu', animation: 150, ghostClass: 'ghost', forceFallback: true }),
  ];

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Hold a recipe and move it: the readout fills in, and empties again on drop.';
    el.append(hint);
  } else {
    loopDrive(el, signal, async (hand) => {
      if (menu.children.length > 2) menu.firstElementChild!.remove();
      const src = library.children[Math.floor(Math.random() * RECIPES.length)]!;
      await hand.drag(src, menu.lastElementChild ? { el: menu.lastElementChild, fy: 0.9 } : menu, 1.6);
    }, 0.8);
  }

  return () => {
    cancelAnimationFrame(frame);
    release(...sortables);
  };
};

export default mount;
