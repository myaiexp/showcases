// scrollSpeed and scrollThreshold: dragging toward the edge of a scrollable container scrolls it automatically
import { createDraggable } from 'animejs';
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const scroller = document.createElement('div');
  scroller.className = 'scroller';
  const content = document.createElement('div');
  content.className = 'content';
  const item = document.createElement('div');
  item.className = 'item';
  content.append(item);
  scroller.append(content);
  el.append(scroller);

  const d = createDraggable(item, { container: scroller, scrollSpeed: 1.5, scrollThreshold: 20 });

  const readout = document.createElement('div');
  readout.className = 'readout';
  const show = (): void => {
    readout.textContent = `scrollSpeed: ${d.scrollSpeed}  scrollThreshold: ${d.scrollThreshold}  scrollLeft: ${Math.round(scroller.scrollLeft)}  scrollTop: ${Math.round(scroller.scrollTop)}`;
  };
  scroller.addEventListener('scroll', show);

  let cancelDrag: (() => void) | undefined;
  const run = (): void => {
    cancelDrag?.();
    d.reset();
    scroller.scrollTo(0, 0);
    // drag toward the bottom-right corner slowly, so the edge is crossed and held
    cancelDrag = fakeDrag(item, 260, 320, 2600, show);
  };

  let timer = 0;
  if (preview) {
    run();
    timer = window.setInterval(run, 4200);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const slider = (name: 'scrollSpeed' | 'scrollThreshold', max: number, step: number): void => {
      const label = document.createElement('label');
      label.className = 'label';
      label.textContent = `${name} `;
      const input = document.createElement('input');
      input.type = 'range';
      input.min = '0';
      input.max = String(max);
      input.step = String(step);
      input.value = String(d[name]);
      input.addEventListener('input', () => {
        d[name] = Number(input.value);
        show();
      });
      label.append(input);
      panel.append(label);
    };
    slider('scrollSpeed', 5, 0.5);
    slider('scrollThreshold', 80, 5);
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Drag toward the bottom-right edge';
    b.addEventListener('click', run);
    panel.append(b);
    el.append(panel, readout);
    show();
  }

  return () => {
    window.clearInterval(timer);
    cancelDrag?.();
    scroller.removeEventListener('scroll', show);
    d.revert();
  };
};

export default mount;
