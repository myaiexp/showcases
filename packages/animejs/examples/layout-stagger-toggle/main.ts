// Layout update toggle: flip a class inside update() with a stagger() delay
import { createLayout, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'layout-root';
  for (const name of ['A', 'B', 'C', 'D', 'E']) {
    const item = document.createElement('div');
    item.className = 'item';
    item.textContent = name;
    root.append(item);
  }
  el.append(root);

  const layout = createLayout(root, { ease: 'outExpo', duration: 700 });
  let gap = 60;

  const toggle = (): void => {
    layout.update(
      () => root.classList.toggle('row'),
      // Count from the opposite end depending on the state we are heading to.
      { delay: stagger(gap, { from: root.classList.contains('row') ? 'last' : 'first' }) },
    );
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(toggle, 1800);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = 'Toggle layout';
    button.addEventListener('click', toggle);
    const label = document.createElement('label');
    label.className = 'label';
    const readout = document.createElement('span');
    readout.textContent = `stagger(${gap})`;
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '200';
    slider.value = String(gap);
    slider.addEventListener('input', () => {
      gap = Number(slider.value);
      readout.textContent = `stagger(${gap})`;
    });
    label.append(readout, ' ', slider);
    panel.append(button, label);
    el.append(panel);
  }

  return () => {
    window.clearInterval(timer);
    layout.revert();
  };
};

export default mount;
