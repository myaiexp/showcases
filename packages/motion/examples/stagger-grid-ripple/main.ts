// A photo wall where tapping a tile sends a ripple outward from it: stagger with grid [cols, rows] and from: index
import { animate, delay, scopeMotion, stagger } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const cols = preview ? 7 : 10;
  const rows = preview ? 4 : 6;
  el.innerHTML = `
    <div class="wall${preview ? '' : ' full'}" style="grid-template-columns:repeat(${cols},1fr)">
      ${Array.from({ length: cols * rows }, (_, i) => `<i class="tile" style="background:hsl(${(i % cols) * 22 + Math.floor(i / cols) * 40} 60% 48%)"></i>`).join('')}
    </div>
    <code class="call"></code>`;
  const wall = el.querySelector<HTMLElement>('.wall')!;
  const tiles = [...el.querySelectorAll<HTMLElement>('.tile')];
  const call = el.querySelector<HTMLElement>('.call')!;
  let step = 0.05;
  let useGrid = true;
  let run: <R>(cb: () => R) => R = (cb) => cb();
  let p: ReturnType<typeof panel> | undefined;
  const ac = new AbortController();

  const ripple = (from: number): void => {
    // With `grid`, delays follow the 2D distance from the tapped cell, so the wave is round.
    const delayFn = useGrid ? stagger(step, { grid: [cols, rows], from }) : stagger(step, { from });
    call.textContent = useGrid ? `stagger(${step}, { grid: [${cols}, ${rows}], from: ${from} })` : `stagger(${step}, { from: ${from} }) (no grid: a row-by-row sweep)`;
    run(() => {
      animate(tiles, { scale: [1, 1.35, 1], filter: ['brightness(1)', 'brightness(1.8)', 'brightness(1)'] }, { duration: 0.6, delay: delayFn });
    });
  };

  const scope = scopeMotion(el, (s) => {
    run = s.run;
    if (preview) {
      const spots = [10, 4, 21, 14];
      let n = 0;
      const tick = (): void => {
        ripple(spots[n++ % spots.length]!);
        delay(tick, 2);
      };
      delay(tick, 0.3);
    } else {
      hint(el, 'Tap any tile. The ripple starts there and spreads in a circle, because stagger() measures distance across the grid in columns and rows.');
      p = panel(el);
      p.slider('step (s)', { min: 0.01, max: 0.12, step: 0.01, value: step }, (v) => { step = v; });
      p.toggle('use grid option', true, (v) => { useGrid = v; });
      wall.addEventListener('click', (e) => {
        const i = tiles.indexOf(e.target as HTMLElement);
        if (i >= 0) ripple(i);
      }, { signal: ac.signal });
      ripple(Math.floor((rows / 2) * cols + cols / 2));
    }
  });
  return () => { scope.cancel(); ac.abort(); p?.dispose(); };
};

export default mount;
