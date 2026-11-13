// Layout enter animation: added items fly in from enterFrom and push their neighbours aside
import { createLayout } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const MAX = 15;

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'root';
  el.append(root);

  const layout = createLayout(root, {
    duration: 250,
    ease: 'outQuad',
    enterFrom: {
      transform: 'translateY(100px) scale(.25)',
      opacity: 0,
      duration: 350, // applied to the entering elements only
      ease: 'out(3)',
    },
  });

  let count = 0;
  const readout = document.createElement('div');
  readout.className = 'label';
  const button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'Add item';

  const addItem = (): void => {
    if (count >= MAX) return;
    layout.update(() => {
      const item = document.createElement('div');
      item.className = 'item';
      item.textContent = String(++count);
      root.append(item);
    });
    // entering is repopulated by every update()
    readout.textContent = `items: ${count}, layout.entering.length: ${layout.entering.length}`;
    button.disabled = count >= MAX;
  };

  let timer = 0;
  if (preview) {
    const step = (): void => {
      if (count >= 8) {
        // empty the root without a layout transition, then start over
        root.replaceChildren();
        count = 0;
      }
      addItem();
    };
    step();
    timer = window.setInterval(step, 650);
  } else {
    button.addEventListener('click', addItem);
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.append(button, readout);
    el.append(panel);
    addItem();
  }

  return () => {
    window.clearInterval(timer);
    button.removeEventListener('click', addItem);
    layout.revert();
  };
};

export default mount;
