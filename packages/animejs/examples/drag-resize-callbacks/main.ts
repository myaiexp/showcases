// onResize and onAfterResize: resizing the container fires both; onAfterResize pulls the square back into view
import { createDraggable } from 'animejs';
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const frame = document.createElement('div');
  frame.className = 'frame';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const item = document.createElement('div');
  item.className = 'item';
  stage.append(item);
  frame.append(stage);
  el.append(frame);

  const readout = document.createElement('div');
  readout.className = 'readout';
  let resizes = 0;
  let afterResizes = 0;
  const show = (): void => {
    readout.textContent = `onResize: ${resizes}   onAfterResize: ${afterResizes}   width: ${Math.round(stage.offsetWidth)}px`;
  };

  const d = createDraggable(item, {
    container: stage,
    velocityMultiplier: 0,
    onResize: () => {
      resizes++;
      show();
    },
    onAfterResize: (self) => {
      afterResizes++;
      show();
      self.animateInView(500, 10); // bring the square back inside the new, smaller bounds
    },
  });

  const setWidth = (pct: number): void => {
    stage.style.width = `${pct}%`;
  };

  const timeouts = new Set<number>();
  const later = (fn: () => void, ms: number): void => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
  };
  let cancelDrag: (() => void) | undefined;
  const toTheRight = (): void => {
    cancelDrag = fakeDrag(item, 600, 0, 300);
  };

  let timer = 0;
  if (preview) {
    const cycle = (): void => {
      setWidth(100);
      later(toTheRight, 900);
      later(() => setWidth(55), 1700);
    };
    cycle();
    timer = window.setInterval(cycle, 3600);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = 'container width ';
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '30';
    range.max = '100';
    range.value = '100';
    range.addEventListener('input', () => setWidth(Number(range.value)));
    label.append(range);
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Throw the square to the right edge';
    b.addEventListener('click', toTheRight);
    panel.append(label, b);
    el.append(panel, readout);
    show();
  }
  setWidth(100);

  return () => {
    window.clearInterval(timer);
    timeouts.forEach((id) => window.clearTimeout(id));
    cancelDrag?.();
    d.revert();
  };
};

export default mount;
