// A rotated SVG square has its origin tweened to a corner, with and without smoothOrigin
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';

function buildSvg(label: string): { wrap: HTMLElement; rect: SVGRectElement } {
  const wrap = document.createElement('figure');
  wrap.className = 'fig';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 200 160');
  svg.setAttribute('class', 'stage');
  const ghost = document.createElementNS(NS, 'rect');
  const rect = document.createElementNS(NS, 'rect');
  for (const [n, cls] of [[ghost, 'ghost'], [rect, 'shape']] as const) {
    for (const [k, v] of Object.entries({ x: 70, y: 40, width: 60, height: 60, rx: 4, class: cls })) n.setAttribute(k, String(v));
    svg.append(n);
  }
  // the ghost sits at the same 45 degree angle, so any drift of the square is visible
  ghost.setAttribute('transform', 'rotate(45 100 70)');
  const cap = document.createElement('figcaption');
  cap.textContent = label;
  wrap.append(svg, cap);
  return { wrap, rect };
}

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const smooth = buildSvg('smoothOrigin: true');
  const raw = buildSvg('smoothOrigin: false');
  root.append(smooth.wrap, raw.wrap);
  el.append(root);

  const ctx = gsap.context(() => {
    // rotate both squares around their centre first, so the origin change has something to disturb
    gsap.set([smooth.rect, raw.rect], { rotation: 45, transformOrigin: '50% 50%' });
    const move = { transformOrigin: '0% 0%', duration: 1.6, ease: 'power1.inOut', repeat: -1, yoyo: true, repeatDelay: 0.3 };
    gsap.to(smooth.rect, { ...move, smoothOrigin: true });
    gsap.to(raw.rect, { ...move, smoothOrigin: false });
  }, el);

  return () => ctx.revert();
};

export default mount;
