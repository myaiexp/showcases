// Draggable snap grid: change snap size live, lock axes, scripted hops in the preview
import { createDraggable } from 'animejs';
import type { Draggable } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const CELL = 56;

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const square = document.createElement('div');
  square.className = 'square';
  stage.append(square);
  el.append(stage);

  let draggable: Draggable;
  let lockX = false;
  let lockY = false;
  let snap = CELL;
  let snaps = 0;
  const readout = document.createElement('span');

  const build = (): void => {
    draggable?.revert();
    draggable = createDraggable(square, {
      container: stage,
      snap,
      x: lockX ? false : { snap },
      y: lockY ? false : { snap },
      onSnap: () => {
        readout.textContent = `snaps: ${++snaps}`;
      },
    });
  };
  build();

  let timer = 0;
  if (preview) {
    // Hop between grid cells with the documented setX() / setY() methods.
    const cells: Array<[number, number]> = [[1, 0], [3, 1], [2, 2], [0, 1], [0, 0]];
    let i = 0;
    timer = window.setInterval(() => {
      const [cx, cy] = cells[i++ % cells.length] ?? [0, 0];
      draggable.setX(cx * CELL).setY(cy * CELL);
    }, 900);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const button = (label: string, onClick: () => void): HTMLButtonElement => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', onClick);
      panel.append(b);
      return b;
    };
    for (const size of [14, 28, 56, 112]) {
      button(`snap ${size}`, () => {
        snap = size;
        // snapX / snapY are documented as gettable and settable properties.
        draggable.snapX = size;
        draggable.snapY = size;
        stage.style.setProperty('--cell', `${size}px`);
      });
    }
    const bx = button('x: enabled', () => {
      lockX = !lockX;
      bx.textContent = lockX ? 'x: false' : 'x: enabled';
      build();
    });
    const by = button('y: enabled', () => {
      lockY = !lockY;
      by.textContent = lockY ? 'y: false' : 'y: enabled';
      build();
    });
    readout.className = 'readout';
    readout.textContent = 'snaps: 0';
    panel.append(readout);
    el.append(panel);
    stage.style.setProperty('--cell', `${CELL}px`);
  }

  return () => {
    window.clearInterval(timer);
    draggable.revert();
  };
};

export default mount;
