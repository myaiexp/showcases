// Layout exit animation: hidden items animate to leaveTo, then are removed once the update settles
import { createLayout } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const COUNT = 10;

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'root';
  const fill = (): void => {
    for (let i = 1; i <= COUNT; i++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.textContent = String(i);
      root.append(item);
    }
  };
  fill();
  el.append(root);

  const layout = createLayout(root, {
    duration: 250,
    ease: 'outQuad',
    leaveTo: {
      transform: 'translateY(-100px) scale(.25)',
      opacity: 0,
      duration: 350, // applied to the leaving elements only
      ease: 'out(3)',
    },
  });

  let alive = true;
  const readout = document.createElement('div');
  readout.className = 'label';
  const button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'Remove item';

  const removeItem = (): void => {
    const items = root.querySelectorAll('.item:not(.is-hidden)');
    if (!items.length) {
      button.disabled = true;
      return;
    }
    layout.update(() => {
      // display: none is what marks an element as leaving
      items[0]?.classList.add('is-hidden');
    }).then(() => {
      // the transition is over: drop the hidden elements for real
      if (alive) layout.leaving.forEach((n) => (n as HTMLElement).remove());
    });
    readout.textContent = `left in the DOM: ${items.length - 1}, layout.leaving.length: ${layout.leaving.length}`;
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => {
      if (!root.querySelector('.item:not(.is-hidden)')) {
        root.replaceChildren();
        fill();
        return;
      }
      removeItem();
    }, 600);
  } else {
    button.addEventListener('click', removeItem);
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.append(button, readout);
    el.append(panel);
    readout.textContent = `left in the DOM: ${COUNT}`;
  }

  return () => {
    alive = false;
    window.clearInterval(timer);
    button.removeEventListener('click', removeItem);
    layout.revert();
  };
};

export default mount;
