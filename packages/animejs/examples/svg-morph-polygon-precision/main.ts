// morphTo on polygon points: random star shapes morph one into the next, with a selectable precision
import { animate, svg, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';
const PRECISIONS = [0, 0.33, 1];

// A star with `total` vertices; the inner radius varies.
function starPoints(total: number, inner: number): string {
  const r2 = 48;
  let points = '';
  const count = total % 2 ? total + 1 : total;
  for (let i = 0; i < count; i++) {
    const r = i % 2 ? inner : r2;
    const a = (2 * Math.PI * i) / count - Math.PI / 2;
    points += `${152 + utils.round(r * Math.cos(a), 0)},${56 + utils.round(r * Math.sin(a), 0)} `;
  }
  return points;
}

const mount: Mount = (el, { preview }) => {
  const root = document.createElementNS(NS, 'svg');
  root.setAttribute('viewBox', '0 0 304 112');
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('class', 'shapes');
  const shown = document.createElementNS(NS, 'polygon');
  const hidden = document.createElementNS(NS, 'polygon');
  hidden.setAttribute('style', 'opacity: 0');
  const start = starPoints(8, 28);
  shown.setAttribute('points', start);
  hidden.setAttribute('points', start);
  g.append(shown, hidden);
  root.append(g);
  el.append(root);

  let precision = 0.33;
  let stopped = false;
  let animation: ReturnType<typeof animate> | undefined;
  const morph = (): void => {
    if (stopped) return;
    // Write the destination points on the hidden polygon, then morph the visible one into it
    utils.set(hidden, { points: starPoints(utils.random(4, 40), utils.random(6, 46)) });
    animation = animate(shown, {
      points: svg.morphTo(hidden, precision),
      ease: 'inOutCirc',
      duration: 700,
      onComplete: morph,
    });
  };
  morph();

  if (!preview) {
    const readout = document.createElement('div');
    readout.className = 'readout';
    const show = (): void => {
      readout.textContent = `svg.morphTo(shape, ${precision})`;
    };
    const bar = document.createElement('div');
    bar.className = 'bar';
    for (const p of PRECISIONS) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = `precision ${p}`;
      b.addEventListener('click', () => {
        precision = p;
        show();
      });
      bar.append(b);
    }
    show();
    el.append(bar, readout);
  }

  return () => {
    stopped = true;
    animation?.revert();
  };
};

export default mount;
