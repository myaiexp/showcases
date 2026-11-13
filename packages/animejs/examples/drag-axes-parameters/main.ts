// Axes parameters: x and y accept their own objects (snap) or false, alongside global parameters
import { createDraggable } from 'animejs';
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import './style.css';

const SPECS = [
  { label: 'x: { snap: 40 }, y: false', settings: { x: { snap: 40 }, y: false as const } },
  { label: 'x: false, y: { snap: 50 }', settings: { x: false as const, y: { snap: 50 } } },
  { label: 'snap: 25, x: { snap: [0, 60] }', settings: { snap: 25, x: { snap: [0, 60] } } },
];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  el.append(stage);

  const lanes = SPECS.map(({ label, settings }, i) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.style.left = `${8 + i * (preview ? 70 : 140)}px`;
    item.style.setProperty('--hue', String(i * 70 + 190));
    stage.append(item);
    if (!preview) {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.style.left = `${8 + i * 140}px`;
      tag.style.right = 'auto';
      tag.style.bottom = '4px';
      tag.textContent = label;
      stage.append(tag);
    }
    return { item, d: createDraggable(item, { container: stage, velocityMultiplier: 0, ...settings }) };
  });

  const readout = document.createElement('div');
  readout.className = 'readout';
  const show = (): void => {
    readout.textContent = lanes.map(({ d }, i) => `#${i + 1} (${Math.round(d.x)}, ${Math.round(d.y)})`).join('   ');
  };

  const cancels: Array<() => void> = [];
  // The same diagonal drag on all three: each axis object decides what it does with it.
  const run = (): void => {
    lanes.forEach(({ d }) => d.reset());
    lanes.forEach(({ item }) => cancels.push(fakeDrag(item, 55, 70, 600, show)));
    show();
  };

  let timer = 0;
  if (preview) {
    run();
    timer = window.setInterval(run, 2400);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Replay the same diagonal drag (55px, 70px) on all three';
    b.addEventListener('click', run);
    panel.append(b);
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
