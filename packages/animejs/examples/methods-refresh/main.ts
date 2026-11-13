// Function-based random values re-rolled by refresh() on every loop and on demand
import { animate, utils, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const squares: HTMLElement[] = [];
  for (let i = 0; i < 2; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    const sq = document.createElement('div');
    sq.className = 'square';
    row.append(sq);
    stage.append(row);
    squares.push(sq);
  }
  el.append(stage);

  const animation: JSAnimation = animate(squares, {
    x: () => utils.random(0, 14) + 'rem',
    y: () => utils.random(-1, 1) + 'rem',
    rotate: () => utils.random(-360, 360, 1),
    scale: () => utils.random(0.4, 1.5, 2),
    duration: 750,
    loop: true,
    // Each loop re-computes the function values: from = where the target is now.
    onLoop: (self) => self.refresh(),
  });

  const cleanups: (() => void)[] = [];
  if (!preview) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Refresh & restart';
    const handler = (): void => void animation.refresh().restart();
    btn.addEventListener('click', handler);
    cleanups.push(() => btn.removeEventListener('click', handler));
    el.append(btn);
  }

  return () => {
    cleanups.forEach((fn) => fn());
    animation.revert();
  };
};

export default mount;
