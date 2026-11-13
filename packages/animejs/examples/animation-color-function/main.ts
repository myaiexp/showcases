// CSS color() function as a waapi.animate() value, p3 against sRGB
import { waapi } from 'animejs';
import type { WAAPIAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const TARGETS = [
  { label: 'color(display-p3 1 0.267 0.267)', to: 'color(display-p3 1.0 0.267 0.267 / 1.0)' },
  { label: 'color(display-p3 0.2 0.9 0.4)', to: 'color(display-p3 0.2 0.9 0.4 / 1.0)' },
  { label: 'color(srgb 0.3 0.5 1)', to: 'color(srgb 0.3 0.5 1 / 1.0)' },
  { label: 'color(display-p3 1 0.78 0.19)', to: 'color(display-p3 1.0 0.78 0.19 / 1.0)' },
];

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';
  const cells = TARGETS.map((t) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const circle = document.createElement('div');
    circle.className = 'circle';
    cell.append(circle);
    if (!preview) {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = t.label;
      cell.append(tag);
    }
    row.append(cell);
    return circle;
  });
  el.append(row);

  const anims: WAAPIAnimation[] = [];
  const run = (): void => {
    anims.splice(0).forEach((a) => a.revert());
    TARGETS.forEach((t, i) => {
      anims.push(waapi.animate(cells[i] as HTMLElement, { backgroundColor: t.to, duration: 1200, delay: i * 150 }));
    });
  };
  run();

  const timer = window.setInterval(run, 3600);
  const cleanups: (() => void)[] = [];
  if (!preview) {
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'Wide-gamut p3 colours only look different from sRGB on a display that supports them.';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Replay';
    btn.addEventListener('click', run);
    cleanups.push(() => btn.removeEventListener('click', run));
    el.append(note, btn);
  }

  return () => {
    window.clearInterval(timer);
    cleanups.forEach((fn) => fn());
    anims.forEach((a) => a.revert());
  };
};

export default mount;
