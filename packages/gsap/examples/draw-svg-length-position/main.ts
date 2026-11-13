// DrawSVG: five shapes whose stroke is drawn as a sliding window, with getLength and getPosition read every frame
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { h, slider } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(DrawSVGPlugin);

const NS = 'http://www.w3.org/2000/svg';
const SHAPES: Array<{ name: string; tag: string; attrs: Record<string, string> }> = [
  { name: 'circle', tag: 'circle', attrs: { cx: '50', cy: '50', r: '34' } },
  { name: 'rect', tag: 'rect', attrs: { x: '14', y: '26', width: '72', height: '48', rx: '6' } },
  { name: 'line', tag: 'line', attrs: { x1: '10', y1: '80', x2: '90', y2: '20' } },
  { name: 'polygon', tag: 'polygon', attrs: { points: '50,10 88,32 88,68 50,90 12,68 12,32' } },
  { name: 'path', tag: 'path', attrs: { d: 'M8,60 C25,10 40,10 50,50 S75,90 92,40' } },
];

const mount: Mount = (el, { preview }) => {
  const grid = h('div', preview ? 'grid small' : 'grid', '', el);
  const cells = SHAPES.map((s) => {
    const cell = h('div', 'cell', '', grid);
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    const ghost = document.createElementNS(NS, s.tag);
    const stroke = document.createElementNS(NS, s.tag);
    for (const [k, v] of Object.entries(s.attrs)) {
      ghost.setAttribute(k, v);
      stroke.setAttribute(k, v);
    }
    ghost.setAttribute('class', 'ghost');
    stroke.setAttribute('class', 'stroke');
    svg.append(ghost, stroke);
    cell.append(svg);
    h('span', 'name', preview ? '' : s.name, cell);
    return { // the typings list only some element types for DrawSVG, though any stroked shape works
      stroke: stroke as SVGPathElement, label: h('span', 'val', '', cell) };
  });

  const tweens: gsap.core.Tween[] = [];
  const ctx = gsap.context(() => {
    cells.forEach((c, i) => {
      // a window of the stroke slides from the start to the end
      tweens.push(
        gsap.fromTo(c.stroke, { drawSVG: '0% 25%' }, { drawSVG: '75% 100%', duration: 2 + i * 0.3, ease: 'sine.inOut', repeat: -1, yoyo: true }),
      );
    });
  }, el);

  // Read the plugin's helpers each frame. getPosition gives [start, end] in length units.
  const read = (): void => {
    cells.forEach((c) => {
      const len = DrawSVGPlugin.getLength(c.stroke);
      const [from = 0, to = 0] = DrawSVGPlugin.getPosition(c.stroke);
      const pct = Math.floor(to / (len / 100));
      const text = preview ? `${pct}%` : `length ${len.toFixed(1)}\nposition ${from.toFixed(1)} to ${to.toFixed(1)}\nend at ${pct}%`;
      if (c.label.textContent !== text) c.label.textContent = text;
    });
  };
  gsap.ticker.add(read);

  if (!preview) {
    const bar = h('div', 'controls', '', el);
    const s = slider('scrub all (pauses the loops)', 0, 1, 0.01, 0, (v) => tweens.forEach((t) => t.pause().progress(v)), bar);
    s.addEventListener('pointerdown', () => tweens.forEach((t) => t.pause()));
    h('p', 'note', 'Each stroke is a window sliding along the shape. DrawSVGPlugin.getLength() is the stroke length and getPosition() the window start and end, read on every frame. Drag the slider to freeze the loops and scrub them.', el);
  }

  return () => {
    gsap.ticker.remove(read);
    ctx.revert();
  };
};

export default mount;
