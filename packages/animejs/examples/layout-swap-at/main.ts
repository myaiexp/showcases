// Layout swapAt: toggle a row/column layout with a faded-and-blurred or a fully visible swap
import { createLayout } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'layout-root';
  const texts = ['These paragraphs are not animated', 'They only swap at 50% progress'];
  for (const text of texts) {
    const item = document.createElement('div');
    item.className = 'item';
    const p = document.createElement('p');
    p.textContent = text;
    item.append(p);
    root.append(item);
  }
  el.append(root);

  // Only .item elements are targets; the <p> inside each one is swapped at 50%.
  const layout = createLayout(root, { children: '.item', duration: 1000 });

  const run = (swapAt: Record<string, string | number>): void => {
    layout.update(() => root.classList.toggle('row'), { swapAt });
  };
  const withFade = (): void => run({ opacity: 0, filter: 'blur(3px)' });
  const withoutFade = (): void => run({ opacity: 1 });

  let timer = 0;
  if (preview) {
    let fade = true;
    timer = window.setInterval(() => {
      if (fade) withFade();
      else withoutFade();
      fade = !fade;
    }, 1800);
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
    add('swapAt: opacity 0 + blur', withFade);
    add('swapAt: opacity 1', withoutFade);
    el.append(panel);
  }

  return () => {
    window.clearInterval(timer);
    layout.revert();
  };
};

export default mount;
