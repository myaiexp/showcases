// Layout methods: record() + animate(), update() shuffle, and revert() mid-flight
import { createLayout, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'layout-root';
  for (const name of 'ABCDEFG') {
    const item = document.createElement('div');
    item.className = 'item';
    item.textContent = name;
    root.append(item);
  }
  el.append(root);

  const layout = createLayout(root);
  const status = document.createElement('div');
  status.className = 'status';

  const say = (text: string): void => {
    status.textContent = text;
  };

  // Manual: record the state, change the DOM yourself, then animate().
  const rotate = (): void => {
    layout.record();
    const first = layout.root.firstElementChild;
    if (first) layout.root.append(first);
    layout.animate({ duration: 2000, ease: 'out(4)' }).then(() => say('rotate finished'));
    say('record() + animate() running');
  };
  // One call: update() records, runs the callback, then animates.
  const shuffle = (): void => {
    layout
      .update(() => {
        const items = [...root.querySelectorAll('.item')];
        utils.shuffle(items).forEach((n) => root.appendChild(n));
      }, { duration: 2000, ease: 'out(4)' })
      .then(() => say('shuffle finished'));
    say('update() running');
  };

  let timer = 0;
  if (preview) {
    let i = 0;
    timer = window.setInterval(() => {
      if (i++ % 2) rotate();
      else shuffle();
    }, 1600);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const add = (label: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', fn);
      panel.append(b);
    };
    add('record() + animate()', rotate);
    add('update() shuffle', shuffle);
    add('revert()', () => {
      layout.revert();
      say('revert(): running transitions completed');
    });
    el.append(panel, status);
  }

  return () => {
    window.clearInterval(timer);
    layout.revert();
  };
};

export default mount;
