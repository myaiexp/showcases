// Layout swap parent: one item is moved between two containers and glides across
import { createLayout } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'root';
  const boxes = ['a', 'b'].map((k) => {
    const box = document.createElement('div');
    box.className = `box box-${k}`;
    return box;
  });
  const item = document.createElement('div');
  item.className = 'item';
  item.textContent = 'Item A';
  boxes[0]?.append(item);
  root.append(...boxes);
  el.append(root);

  const layout = createLayout(root);

  const readout = document.createElement('div');
  readout.className = 'label';
  const swap = (): void => {
    layout.update(() => {
      const parent = item.parentElement as HTMLElement;
      const next = (parent.nextElementSibling || parent.previousElementSibling) as HTMLElement;
      parent.style.zIndex = '0'; // the destination draws on top while the item travels
      next.style.zIndex = '1';
      next.appendChild(item);
    });
    readout.textContent = `parent: .${(item.parentElement as HTMLElement).className.split(' ')[1]}, layout.animating.length: ${layout.animating.length}`;
  };

  let timer = 0;
  let button: HTMLButtonElement | null = null;
  if (preview) {
    timer = window.setInterval(swap, 1500);
  } else {
    button = document.createElement('button');
    button.className = 'btn';
    button.textContent = 'Swap parent';
    button.addEventListener('click', swap);
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.append(button, readout);
    el.append(panel);
    readout.textContent = 'parent: .box-a';
  }

  return () => {
    window.clearInterval(timer);
    button?.removeEventListener('click', swap);
    layout.revert();
  };
};

export default mount;
