// A click-opened menu appended to the button's parent so Tab flows into it
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const ITEMS = ['Rename', 'Duplicate', 'Delete'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Tab to Options, press Enter, then Tab into the menu.' });

  // The button gets its own wrapper so no other focusable sibling comes after it.
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Options ▾';
  wrap.append(button);
  const readout = document.createElement('div');
  readout.className = 'readout';
  const expandedLine = document.createElement('div');
  const whereLine = document.createElement('div');
  const nextLine = document.createElement('div');
  readout.append(expandedLine, whereLine, nextLine);
  stage.root.append(wrap, readout);

  const menu = document.createElement('div');
  menu.className = 'menu';
  const items = ITEMS.map((label) => {
    const item = document.createElement('button');
    item.className = 'item';
    item.textContent = label;
    item.addEventListener('click', () => {
      tip.hide();
      button.focus({ preventScroll: true });
    });
    menu.append(item);
    return item;
  });

  const tip = stage.own(
    tippy(button, {
      content: menu,
      trigger: 'click',
      interactive: true,
      // Next to the button in the DOM, so the next Tab stop is the first menu item.
      appendTo: 'parent',
      placement: 'bottom-start',
      arrow: false,
      onShown: () => items[0]!.focus({ preventScroll: true }),
    }),
  );

  const render = (): void => {
    const open = tip.state.isMounted;
    expandedLine.textContent = `aria-expanded="${button.getAttribute('aria-expanded')}"`;
    whereLine.textContent = `menu in wrapper: ${wrap.contains(menu) ? 'yes' : 'no'}`;
    nextLine.textContent = open ? 'next Tab: Rename' : 'next Tab: the page';
  };
  render();
  const watcher = new MutationObserver(render);
  watcher.observe(button, { attributes: true, attributeFilter: ['aria-expanded'] });
  watcher.observe(wrap, { childList: true });
  stage.onDispose(() => watcher.disconnect());

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.click(button, 800);
      await wait(1800);
      await stage.ghost.click(button, 300);
      await wait(1300);
      await stage.ghost.moveTo({ x: 200, y: 170 }, 500);
    });
  }

  return stage.dispose;
};

export default mount;
