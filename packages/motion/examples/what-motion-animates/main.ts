// One animate() call per kind of target: element, SVG path, plain object, CSS variable
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="tiles">
      <div class="tile"><div class="demo"><div class="box"></div></div><b>HTML element</b></div>
      <div class="tile"><div class="demo"><svg viewBox="0 0 60 40"><path d="M6 32 C 16 2, 28 2, 30 20 S 46 38, 54 8"/></svg></div><b>SVG path</b></div>
      <div class="tile"><div class="demo"><output class="readout">0</output></div><b>JS object</b></div>
      <div class="tile"><div class="demo"><div class="swatch"></div></div><b>CSS variable</b></div>
    </div>`;
  if (!preview) hint(el, 'Four animate() calls, four targets, all looping. Read main.ts to see what each one is handed.');

  const loop = { repeat: Infinity, repeatType: 'reverse', duration: 1.6 } as const;

  const scope = scopeMotion(el, () => {
    // 1. An HTML element: transforms are independent values.
    animate('.box', { x: [-18, 18], rotate: [-20, 20] }, loop);

    // 2. An SVG path: pathLength is a 0 to 1 progress value.
    animate('path', { pathLength: [0, 1] }, loop);

    // 3. A plain object: Motion changes its number; onUpdate lets us show it.
    const stats = { score: 0 };
    const out = el.querySelector('.readout');
    animate(stats, { score: 100 }, {
      ...loop,
      onUpdate: () => {
        if (out) out.textContent = String(Math.round(stats.score));
      },
    });

    // 4. A CSS variable that the stylesheet turns into a colour.
    animate('.swatch', { '--hue': [200, 340] }, loop);
  });

  return () => scope.cancel();
};

export default mount;
