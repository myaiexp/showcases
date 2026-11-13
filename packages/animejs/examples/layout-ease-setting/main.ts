// Layout ease: a default ease on createLayout() and per-update overrides, with the ease name shown
import { createLayout, spring } from 'animejs';
import type { EasingParam } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'root row';
  for (const n of [1, 2]) {
    const item = document.createElement('div');
    item.className = 'item';
    item.textContent = `Item ${n}`;
    root.append(item);
  }
  el.append(root);

  const layout = createLayout(root, { ease: 'outExpo' });

  const readout = document.createElement('div');
  readout.className = 'label';
  const play = (label: string, ease?: EasingParam): void => {
    // an ease in the update() parameters beats the layout default
    layout.update(() => root.classList.toggle('row'), ease ? { ease } : undefined);
    readout.textContent = `last update: ${label}`;
  };

  const options: Array<[string, EasingParam | undefined]> = [
    ["'outExpo' (layout default)", undefined],
    ['spring()', spring()],
    ["'inOut(3.5)' (library default)", 'inOut(3.5)'],
  ];

  let timer = 0;
  const buttons: Array<[HTMLButtonElement, () => void]> = [];
  if (preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const opt = options[i++ % 2];
      if (opt) play(opt[0], opt[1]);
    }, 1500);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    options.forEach(([label, ease]) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      const fn = (): void => play(label, ease);
      b.addEventListener('click', fn);
      buttons.push([b, fn]);
      panel.append(b);
    });
    el.append(panel, readout);
    readout.textContent = 'Pick an ease: each button toggles the layout with it.';
  }

  return () => {
    window.clearInterval(timer);
    buttons.forEach(([b, fn]) => b.removeEventListener('click', fn));
    layout.revert();
  };
};

export default mount;
