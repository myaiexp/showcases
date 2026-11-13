// Layout enter/leave: add items with enterFrom, hide-then-remove them with leaveTo
import { createLayout } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const MAX = 12;

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'layout-root';
  el.append(root);

  const layout = createLayout(root, {
    duration: 250,
    ease: 'outQuad',
    // Transform shorthands are not supported in state parameters: use a full transform string.
    enterFrom: { transform: 'translateY(60px) scale(.25)', opacity: 0, duration: 400, ease: 'out(3)' },
    leaveTo: { transform: 'translateY(-60px) scale(.25)', opacity: 0, duration: 400, ease: 'out(3)' },
  });

  let count = 0;
  let disposed = false;
  const live = (): HTMLElement[] => [...root.querySelectorAll<HTMLElement>('.item:not(.is-hidden)')];

  const add = (): void => {
    if (live().length >= MAX) return;
    layout.update(() => {
      const item = document.createElement('div');
      item.className = 'item';
      item.textContent = String(++count);
      root.appendChild(item);
    });
  };
  const remove = (): void => {
    const [first] = live();
    if (!first) return;
    layout
      .update(() => first.classList.add('is-hidden'))
      .then(() => {
        // Remove exactly the element hidden by this call (layout.leaving may have moved on).
        if (!disposed) first.remove();
      });
  };

  let timer = 0;
  if (preview) {
    let adding = true;
    for (let i = 0; i < 4; i++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.textContent = String(++count);
      root.append(item);
    }
    timer = window.setInterval(() => {
      if (live().length >= 8) adding = false;
      if (live().length <= 2) adding = true;
      if (adding) add();
      else remove();
    }, 900);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    for (const [label, fn] of [['Add item', add], ['Remove item', remove]] as const) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', fn);
      panel.append(b);
    }
    el.append(panel);
  }

  return () => {
    disposed = true;
    window.clearInterval(timer);
    layout.revert();
  };
};

export default mount;
