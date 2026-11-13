// containerPadding as a function: sliders change the padding, refresh() re-reads it, a dashed box shows the bounds
import { createDraggable } from 'animejs';
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import './style.css';

const SIDES = ['top', 'right', 'bottom', 'left'] as const;

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const bounds = document.createElement('div');
  bounds.className = 'bounds';
  const item = document.createElement('div');
  item.className = 'item';
  stage.append(bounds, item);
  el.append(stage);

  // [top, right, bottom, left]; the preview uses the values from the docs example
  const pad: number[] = preview ? [16, 32, -16, 64] : [20, 20, 20, 20];
  const drawBounds = (): void => {
    bounds.style.inset = pad.map((p) => `${p}px`).join(' ');
  };
  drawBounds();

  // A function is re-evaluated on resize and whenever refresh() is called.
  const d = createDraggable(item, { container: stage, containerPadding: () => [...pad] });

  const readout = document.createElement('div');
  readout.className = 'readout';
  const show = (): void => {
    readout.textContent = `containerPadding: [${pad.join(', ')}]  x: ${Math.round(d.x)}  y: ${Math.round(d.y)}`;
  };

  let cancelDrag: (() => void) | undefined;
  let flip = false;
  const push = (): void => {
    flip = !flip;
    cancelDrag = fakeDrag(item, flip ? 600 : -600, flip ? 400 : -400, 450, show);
  };

  let timer = 0;
  if (preview) {
    push();
    timer = window.setInterval(push, 1600);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    SIDES.forEach((side, i) => {
      const label = document.createElement('label');
      label.className = 'label';
      label.textContent = `${side} `;
      const input = document.createElement('input');
      input.type = 'range';
      input.min = '-30';
      input.max = '60';
      input.value = String(pad[i]);
      input.addEventListener('input', () => {
        pad[i] = Number(input.value);
        drawBounds();
        d.refresh();
        d.animateInView(300);
        show();
      });
      label.append(input);
      panel.append(label);
    });
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Push into the corners';
    b.addEventListener('click', push);
    panel.append(b);
    el.append(panel, readout);
    d.onUpdate = show;
    show();
  }

  return () => {
    window.clearInterval(timer);
    cancelDrag?.();
    d.revert();
  };
};

export default mount;
