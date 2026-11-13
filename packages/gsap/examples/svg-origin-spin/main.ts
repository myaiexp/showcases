// The same six SVG rects spin around one shared svgOrigin on the left and their own centres on the right
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';
// x, y, size of each rect in a 300 x 200 canvas
const BOXES = [[22, 55, 32], [135, 25, 28], [245, 49, 27], [215, 145, 40], [151, 95, 36], [70, 130, 32]];

function buildSvg(label: string): { wrap: HTMLElement; rects: SVGRectElement[] } {
  const wrap = document.createElement('figure');
  wrap.className = 'fig';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 300 200');
  svg.setAttribute('class', 'stage');
  const rects = BOXES.map(([x, y, s]) => {
    const r = document.createElementNS(NS, 'rect');
    for (const [k, v] of Object.entries({ x, y, width: s, height: s, rx: 5 })) r.setAttribute(k, String(v));
    svg.append(r);
    return r;
  });
  const cap = document.createElement('figcaption');
  cap.textContent = label;
  wrap.append(svg, cap);
  return { wrap, rects };
}

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const shared = buildSvg('svgOrigin: "150 100"');
  const own = buildSvg('transformOrigin: "50% 50%"');
  // a pin where the shared origin sits in the left canvas
  const pin = document.createElementNS(NS, 'circle');
  for (const [k, v] of Object.entries({ cx: 150, cy: 100, r: 4, class: 'pin' })) pin.setAttribute(k, String(v));
  shared.wrap.querySelector('svg')?.append(pin);
  root.append(shared.wrap, own.wrap);
  el.append(root);

  const ctx = gsap.context(() => {
    const spin = { rotation: 360, duration: 1.8, ease: 'power2.inOut', repeat: -1, repeatDelay: 0.4 };
    // svgOrigin is in the SVG's global coordinates: every rect orbits the same point
    gsap.to(shared.rects, { ...spin, svgOrigin: '150 100' });
    // transformOrigin is local to each element
    gsap.to(own.rects, { ...spin, transformOrigin: '50% 50%' });
  }, el);

  return () => ctx.revert();
};

export default mount;
