// Draggable callbacks: counters per callback and a live x / y / velocity readout
import { createDraggable, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const NAMES = ['onGrab', 'onDrag', 'onUpdate', 'onRelease', 'onSnap', 'onSettle'] as const;

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = preview ? 'stage compact' : 'stage';
  const square = document.createElement('div');
  square.className = 'square';
  stage.append(square);

  const log = document.createElement('pre');
  log.className = preview ? 'log compact' : 'log';
  const counts: Record<string, number> = {};
  const cells: Record<string, HTMLElement> = {};
  for (const name of NAMES) {
    counts[name] = 0;
    const row = document.createElement('div');
    const label = document.createElement('span');
    label.className = 'name';
    label.textContent = name;
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = '0';
    row.append(label, value);
    log.append(row);
    cells[name] = value;
  }
  const live = document.createElement('div');
  live.className = 'live';
  log.append(live);
  el.append(stage, log);

  const hit = (name: string): void => {
    const next = (counts[name] ?? 0) + 1;
    counts[name] = next;
    const cell = cells[name];
    if (cell) cell.textContent = String(next);
  };

  const draggable = createDraggable(square, {
    container: stage,
    snap: 40,
    onGrab: () => hit('onGrab'),
    onDrag: () => hit('onDrag'),
    onUpdate: (d) => {
      hit('onUpdate');
      live.textContent = `x ${Math.round(d.x)}  y ${Math.round(d.y)}  v ${d.velocity.toFixed(1)}`;
    },
    onRelease: () => hit('onRelease'),
    onSnap: () => hit('onSnap'),
    onSettle: () => hit('onSettle'),
  });

  let timer = 0;
  if (preview) {
    // setX() / setY() fire onUpdate, so the readout keeps moving without a pointer.
    timer = window.setInterval(() => {
      draggable.setX(utils.random(0, 6) * 40).setY(utils.random(0, preview ? 1 : 2) * 40);
    }, 700);
  }

  return () => {
    window.clearInterval(timer);
    draggable.revert();
  };
};

export default mount;
