// dragThreshold lanes: a short pointer drag moves only the squares whose threshold it exceeds
import { createDraggable } from 'animejs';
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import './style.css';

const LANES = [
  { label: 'dragThreshold: 3 (mouse default)', dragThreshold: 3 },
  { label: 'dragThreshold: { mouse: 10, touch: 15 }', dragThreshold: { mouse: 10, touch: 15 } },
  { label: 'dragThreshold: 20', dragThreshold: 20 },
];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  el.append(stage);

  const lanes = LANES.map(({ label, dragThreshold }, i) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.style.top = `${8 + i * 52}px`;
    item.style.setProperty('--hue', String(i * 70 + 190));
    stage.append(item);
    if (!preview) {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.style.top = `${24 + i * 52}px`;
      tag.textContent = label;
      stage.append(tag);
    }
    return { item, d: createDraggable(item, { container: stage, dragThreshold, velocityMultiplier: 0 }) };
  });

  const readout = document.createElement('div');
  readout.className = 'readout';
  const show = (px: number): void => {
    readout.textContent = `pointer travelled ${px}px, x per lane: ${lanes.map(({ d }) => Math.round(d.x)).join(' | ')}`;
  };

  const cancels: Array<() => void> = [];
  const timeouts = new Set<number>();
  const later = (fn: () => void, ms: number): void => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
  };
  const drag = (px: number): void => {
    lanes.forEach(({ item }) => cancels.push(fakeDrag(item, px, 0, 300, () => show(px))));
  };
  // A small drag, then a bigger one, then back to the start.
  const sequence = (): void => {
    lanes.forEach(({ d }) => d.reset());
    drag(14);
    later(() => drag(50), 1000);
  };

  let timer = 0;
  if (preview) {
    sequence();
    timer = window.setInterval(sequence, 2800);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = 'pointer distance ';
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '0';
    range.max = '60';
    range.value = '14';
    label.append(range);
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Replay drag from the start';
    b.addEventListener('click', () => {
      lanes.forEach(({ d }) => d.reset());
      drag(Number(range.value));
    });
    panel.append(label, b);
    el.append(panel, readout);
  }

  return () => {
    window.clearInterval(timer);
    timeouts.forEach((id) => window.clearTimeout(id));
    cancels.forEach((c) => c());
    lanes.forEach(({ d }) => d.revert());
  };
};

export default mount;
