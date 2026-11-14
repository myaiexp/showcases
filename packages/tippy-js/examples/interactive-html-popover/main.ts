// An account menu that drops down on click: a tippy with live, clickable content
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const ITEMS = ['Profile', 'Settings', 'Billing', 'Sign out'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Click the account button, then pick an item.' });

  const top = document.createElement('div');
  top.className = 'topbar';
  const logo = document.createElement('span');
  logo.className = 'logo';
  logo.textContent = '◆ Acme';
  const account = document.createElement('button');
  account.className = 'btn account';
  account.textContent = 'Ada ▾';
  top.append(logo, account);
  const status = document.createElement('div');
  status.className = 'picked';
  status.textContent = 'Nothing picked yet';
  stage.root.append(top, status);

  // The menu is a real element with its own click handlers: Tippy keeps them working.
  const menu = document.createElement('div');
  menu.className = 'menu';
  const items = ITEMS.map((label) => {
    const item = document.createElement('button');
    item.className = 'item';
    item.textContent = label;
    item.addEventListener('click', () => {
      status.textContent = `You picked “${label}”`;
      dropdown.hide();
    });
    menu.append(item);
    return item;
  });

  const dropdown = stage.own(
    tippy(account, {
      content: menu,
      // Click opens it, and the pointer can move into it without it closing.
      trigger: 'click',
      interactive: true,
      placement: 'bottom-end',
      arrow: false,
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    // Card: the pointer opens the menu, runs down the items and picks one.
    let pick = 0;
    stage.play(async (wait) => {
      await stage.ghost.click(account, 700);
      await wait(400);
      const target = items[pick++ % items.length]!;
      for (const item of items) {
        await stage.ghost.moveTo(item, 260);
        item.classList.add('lit');
        if (item === target) break;
        await wait(120);
        item.classList.remove('lit');
      }
      await wait(250);
      await stage.ghost.click(target);
      target.classList.remove('lit');
      await stage.ghost.moveTo({ x: 60, y: 150 }, 700);
      await wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
