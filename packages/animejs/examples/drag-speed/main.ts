// dragSpeed lanes: the same 120px pointer drag moves each square a different distance
import { createDraggable } from 'animejs';
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import './style.css';

const SPEEDS = [-1, 0, 0.5, 1, 2];

const mount: Mount = (el, { preview }) => {
  const DIST = preview ? 70 : 120; // pointer travel in px
  const stage = document.createElement('div');
  stage.className = 'stage';
  el.append(stage);

  const lanes = SPEEDS.map((dragSpeed, i) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.style.top = `${6 + i * 32}px`;
    item.style.left = preview ? '90px' : '160px'; // room to move left for the negative lane
    item.style.width = item.style.height = '26px';
    item.style.setProperty('--hue', String(i * 55 + 190));
    stage.append(item);
    if (!preview) {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.style.top = `${12 + i * 32}px`;
      tag.textContent = `dragSpeed: ${dragSpeed}`;
      stage.append(tag);
    }
    return { item, d: createDraggable(item, { container: stage, dragSpeed, velocityMultiplier: 0 }) };
  });

  const readout = document.createElement('div');
  readout.className = 'readout';
  const show = (): void => {
    readout.textContent = lanes.map(({ d }) => Math.round(d.x)).join('  |  ');
  };

  const cancels: Array<() => void> = [];
  // Every square gets the same drag to the right (the squares are stacked in lanes).
  const run = (): void => {
    lanes.forEach(({ d }) => d.reset());
    lanes.forEach(({ item }) => cancels.push(fakeDrag(item, DIST, 0, 700, show)));
    show();
  };

  let timer = 0;
  if (preview) {
    run();
    timer = window.setInterval(run, 2600);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const hint = document.createElement('span');
    hint.className = 'label';
    hint.textContent = 'Drag any square, or replay the same 120px drag on all five. x per lane (velocityMultiplier 0 removes the throw):';
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Replay a 120px drag on every lane';
    b.addEventListener('click', run);
    panel.append(hint, b);
    el.append(panel, readout);
    show();
  }

  return () => {
    window.clearInterval(timer);
    cancels.forEach((c) => c());
    lanes.forEach(({ d }) => d.revert());
  };
};

export default mount;
