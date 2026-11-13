// Draggable modifier and mapTo: wrapped axes on the left, x and y mapped to rotateY and z on the right
import { createDraggable, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';
  const makeStage = (caption: string, extra = ''): { stage: HTMLElement; square: HTMLElement } => {
    const wrap = document.createElement('div');
    wrap.className = 'cell';
    const stage = document.createElement('div');
    stage.className = `stage ${extra}`;
    const square = document.createElement('div');
    square.className = 'square';
    stage.append(square);
    const cap = document.createElement('div');
    cap.className = 'caption';
    cap.textContent = caption;
    wrap.append(stage, cap);
    row.append(wrap);
    return { stage, square };
  };

  const a = makeStage('modifier: utils.wrap()');
  const b = makeStage('x: rotateY, y: z', 'persp');
  el.append(row);

  utils.set(b.square, { z: 100 });

  const wrapped = createDraggable(a.square, {
    modifier: utils.wrap(-32, 32), // global to both axes
    x: { modifier: utils.wrap(-60, 60) }, // specific to x
  });
  const mapped = createDraggable(b.square, {
    x: { mapTo: 'rotateY' },
    y: { mapTo: 'z' },
  });

  let timer = 0;
  if (preview) {
    let step = 0;
    timer = window.setInterval(() => {
      step++;
      wrapped.setX(step * 35).setY(step * 14);
      mapped.setX(Math.sin(step) * 120).setY(Math.cos(step) * 40);
    }, 600);
  }

  return () => {
    window.clearInterval(timer);
    wrapped.revert();
    mapped.revert();
  };
};

export default mount;
