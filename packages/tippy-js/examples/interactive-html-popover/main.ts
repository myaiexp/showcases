// Tippy account-menu popover and info tooltip sharing one theme
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import type { Mount } from '@/types.ts';
import './style.css';

const ITEMS = ['Profile', 'Settings', 'Toggle theme', 'Sign out'] as const;

function buildMenu(): HTMLElement {
  const menu = document.createElement('div');
  menu.className = 'menu';
  const head = document.createElement('div');
  head.className = 'menu-head';
  head.textContent = 'Signed in as Ada';
  menu.append(head);
  for (const label of ITEMS) {
    const item = document.createElement('button');
    item.className = 'menu-item';
    item.textContent = label;
    menu.append(item);
  }
  return menu;
}

const mount: Mount = (el, { preview }) => {
  const menuBtn = document.createElement('button');
  menuBtn.className = 'btn';
  menuBtn.textContent = 'Account ▾';
  const row = document.createElement('div');
  row.className = 'row';
  row.append(menuBtn);
  el.append(row);

  const menu = tippy(menuBtn, {
    content: buildMenu(),
    interactive: true,
    trigger: preview ? 'manual' : 'click',
    placement: preview ? 'bottom' : 'bottom-end',
    animation: 'shift-away',
    theme: 'accent',
    // Inside the example root so the scoped theme styles apply.
    appendTo: el,
  });

  if (!preview) {
    const infoBtn = document.createElement('button');
    infoBtn.className = 'btn';
    infoBtn.textContent = "What's this?";
    row.append(infoBtn);
    const info = tippy(infoBtn, {
      content: 'Tooltips and popovers are the same Tippy instance, only the options differ.',
      placement: 'bottom',
      animation: 'shift-away',
      theme: 'accent',
      appendTo: el,
    });
    return () => {
      menu.destroy();
      info.destroy();
    };
  }

  // A preview takes no input, so the menu opens and closes on a timer.
  const timers: number[] = [];
  const cycle = (): void => {
    menu.show();
    timers.push(window.setTimeout(() => menu.hide(), 1800));
  };
  timers.push(window.setTimeout(cycle, 300));
  const interval = window.setInterval(cycle, 2800);
  return () => {
    window.clearInterval(interval);
    for (const t of timers) window.clearTimeout(t);
    menu.destroy();
  };
};

export default mount;
