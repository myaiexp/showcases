// Counts onBegin, onUpdate, onLoop, onComplete and onPause calls of a short looping timeline
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const NAMES = ['onBegin', 'onUpdate', 'onLoop', 'onComplete', 'onPause'] as const;

const mount: Mount = (el, { preview }) => {
  const track = document.createElement('div');
  track.className = 'track';
  const dot = document.createElement('div');
  dot.className = 'dot';
  track.append(dot);

  const table = document.createElement('div');
  table.className = 'table';
  type Name = (typeof NAMES)[number];
  const counts = {} as Record<Name, number>;
  const cells = {} as Record<Name, HTMLElement>;
  for (const name of NAMES) {
    counts[name] = 0;
    const row = document.createElement('div');
    row.className = 'row';
    const l = document.createElement('span');
    l.textContent = name;
    const v = document.createElement('span');
    v.className = 'v';
    v.textContent = '0';
    row.append(l, v);
    table.append(row);
    cells[name] = v;
  }
  el.append(track, table);

  const hit = (name: (typeof NAMES)[number]): void => {
    cells[name].textContent = String(++counts[name]);
    row(cells[name]);
  };
  // Flash the cell that just changed (native element.animate, so no CSS @keyframes needed).
  const theme = getComputedStyle(el);
  const flash = [{ color: theme.getPropertyValue('--accent') }, { color: theme.getPropertyValue('--green') }];
  const row = (cell: HTMLElement): void => {
    cell.animate(flash, { duration: 300, easing: 'ease-out' });
  };

  let restartTimer = 0;
  const reset = (): void => {
    for (const name of NAMES) {
      counts[name] = 0;
      cells[name].textContent = '0';
    }
  };

  const tl = createTimeline({
    defaults: { duration: 600 },
    loop: 2,
    loopDelay: 300,
    onBegin: () => hit('onBegin'),
    onUpdate: () => hit('onUpdate'),
    onLoop: () => hit('onLoop'),
    onComplete: () => {
      hit('onComplete');
      // Start over after a pause so the card keeps moving.
      restartTimer = window.setTimeout(() => {
        reset();
        tl.restart();
      }, preview ? 1200 : 2500);
    },
    onPause: () => hit('onPause'),
  })
    .add(dot, { x: '12rem' })
    .add(dot, { x: '0rem' });

  const cleanups: Array<() => void> = [];
  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const mk = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      bar.append(b);
      cleanups.push(() => b.removeEventListener('click', fn));
    };
    mk('Pause', () => void tl.pause());
    mk('Resume', () => void tl.resume());
    mk('Restart', () => {
      window.clearTimeout(restartTimer);
      reset();
      tl.restart();
    });
    el.append(bar);
  }

  return () => {
    window.clearTimeout(restartTimer);
    cleanups.forEach((fn) => fn());
    tl.revert();
  };
};

export default mount;
