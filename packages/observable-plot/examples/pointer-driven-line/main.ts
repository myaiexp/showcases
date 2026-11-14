// A lineY that grows by atan2(x, y) of the mouse on every move, re-rendered
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';

const mount: Mount = (el, { preview }) => {
  const div = document.createElement('div');
  div.setAttribute('role', 'img');
  div.style.cssText = 'width:100%;display:flex;justify-content:center;color:var(--fg-1);cursor:crosshair';
  el.append(div);

  // Starts as a sine over 200 ticks, as in the docs.
  let data = d3.ticks(-2, 2, 200).map(Math.sin);
  const render = (): void => {
    div.firstChild?.remove(); // remove old chart, if any
    div.append(Plot.lineY(data).plot({ grid: true, ...(preview ? { width: 300, height: 200 } : {}) }));
  };
  const push = (x: number, y: number): void => {
    data = data.slice(-200).concat(Math.atan2(x, y));
    render();
  };
  render();

  const onMove = (event: MouseEvent): void => {
    const [x, y] = d3.pointer(event);
    push(x, y);
  };
  div.addEventListener('mousemove', onMove);

  // A card gets no mouse, so it feeds the same function points along a circle.
  let t = 0;
  const timer = preview ? setInterval(() => push(150 + 120 * Math.cos((t += 0.15)), 100 + 80 * Math.sin(t * 1.7)), 150) : 0;

  return () => {
    clearInterval(timer);
    div.removeEventListener('mousemove', onMove);
    div.remove();
  };
};

export default mount;
