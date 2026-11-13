// Draggable container friction: two draggables, live friction buttons, animateInView
import { createDraggable } from 'animejs';
import type { Draggable } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const square = document.createElement('div');
  square.className = 'item square';
  const circle = document.createElement('div');
  circle.className = 'item circle';
  stage.append(square, circle);
  el.append(stage);

  const loose = createDraggable(square, { container: stage, containerFriction: 0 });
  const stiff = createDraggable(circle, { container: stage, containerFriction: 1 });
  const all: Draggable[] = [loose, stiff];

  let timer = 0;
  let pending = 0;
  if (preview) {
    // Push both outside the container, then pull them back into view.
    const cycle = (): void => {
      loose.x = -30;
      loose.y = 70;
      stiff.x = 180;
      stiff.y = -30;
      window.clearTimeout(pending);
      pending = window.setTimeout(() => all.forEach((d) => d.animateInView(600, 8)), 500);
    };
    cycle();
    timer = window.setInterval(cycle, 2400);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = 'square friction:';
    panel.append(label);
    const add = (text: string, onClick: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', onClick);
      panel.append(b);
    };
    for (const value of [0, 0.5, 0.8, 1]) {
      add(String(value), () => {
        loose.containerFriction = value;
        loose.releaseContainerFriction = value;
      });
    }
    add('animateInView()', () => all.forEach((d) => d.animateInView(400, 16)));
    el.append(panel);
  }

  return () => {
    window.clearInterval(timer);
    window.clearTimeout(pending);
    all.forEach((d) => d.revert());
  };
};

export default mount;
