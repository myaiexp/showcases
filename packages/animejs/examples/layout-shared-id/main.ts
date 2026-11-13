// Layout shared id: show/hide twin elements in two containers so the layout morphs between them
import { createLayout } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'layout-root';
  const make = (cls: string, hidden: boolean): HTMLElement => {
    const box = document.createElement('div');
    box.className = `box ${cls}`;
    const item = document.createElement('div');
    item.className = hidden ? 'item is-hidden' : 'item';
    item.textContent = 'Item A';
    // Same id on both: the layout animates between the hidden and the visible one.
    item.dataset.layoutId = 'item-A';
    box.append(item);
    root.append(box);
    return item;
  };
  const left = make('small', false);
  const right = make('large', true);
  el.append(root);

  // boxShadow is not animated by default: add it to the measured properties.
  const layout = createLayout(root, { duration: 700, ease: 'inOutQuad', properties: ['boxShadow'] });

  const swap = (): void => {
    layout.update(() => {
      left.classList.toggle('is-hidden');
      right.classList.toggle('is-hidden');
    });
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(swap, 1500);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const b = document.createElement('button');
    b.className = 'btn btn-primary';
    b.textContent = 'Toggle visibility';
    b.addEventListener('click', swap);
    panel.append(b);
    el.append(panel);
  }

  return () => {
    window.clearInterval(timer);
    layout.revert();
  };
};

export default mount;
