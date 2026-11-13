// Motion tap grid: click a box to pop it with scale and rotate keyframes
import { animate } from 'motion';
import type { Mount } from '@/types.ts';
import './style.css';

const COLORS = ['blue', 'red', 'green', 'orange', 'purple', 'cyan'] as const;

const mount: Mount = (el, { preview }) => {
  const grid = document.createElement('div');
  grid.className = preview ? 'grid small' : 'grid';
  const boxes = COLORS.map((color) => {
    const box = document.createElement('div');
    box.className = `box ${color}`;
    box.textContent = 'Tap me';
    grid.append(box);
    return box;
  });
  el.append(grid);

  const running = new Set<{ stop(): void }>();
  const pop = (box: HTMLElement): void => {
    const anim = animate(box, { scale: [1, 1.3, 1], rotate: [0, 15, 0] }, { duration: 0.6, ease: 'easeOut' });
    running.add(anim);
  };

  for (const box of boxes) box.addEventListener('click', () => pop(box));

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Uses animate() with keyframe arrays';
    el.append(hint);
  }

  // A preview takes no input, so it taps a random box on a timer.
  let timer = 0;
  if (preview) {
    let i = 0;
    const tick = (): void => {
      i = (i + 1 + Math.floor(Math.random() * 2)) % boxes.length;
      const box = boxes[i];
      if (box) pop(box);
    };
    tick();
    timer = window.setInterval(tick, 500);
  }

  return () => {
    window.clearInterval(timer);
    for (const anim of running) anim.stop();
    running.clear();
  };
};

export default mount;
