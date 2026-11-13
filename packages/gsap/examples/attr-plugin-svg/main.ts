// attr tweens SVG geometry attributes while x outside it moves the CSS transform
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag: string, attrs: Record<string, string>): SVGElement => {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
};

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';

  const svg = svgEl('svg', { viewBox: '0 0 300 170', class: 'stage' });
  svg.append(
    svgEl('rect', { class: 'ghost', x: '10', y: '10', width: '60', height: '40', rx: '6' }),
    svgEl('rect', { class: 'ghost', x: '150', y: '80', width: '100', height: '60', rx: '6' }),
  );
  const rect = svgEl('rect', { class: 'shape', x: '10', y: '10', width: '60', height: '40', rx: '6' });
  const meter = svgEl('rect', { class: 'meter', x: '10', y: '152', width: '10%', height: '10', rx: '3' });
  svg.append(rect, meter);
  root.append(svg);

  const readout = document.createElement('pre');
  readout.className = 'readout';
  if (!preview) root.append(readout);
  el.append(root);

  const ctx = gsap.context(() => {
    gsap.to(rect, {
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      // attr:{} animates the element's own attributes, the geometry
      attr: { x: 150, y: 80, width: 100, height: 60, rx: 30 },
      // x outside attr:{} is the CSS transform: it adds on top of the attribute x
      x: 30,
      onUpdate() {
        readout.textContent =
          `attr x      ${Number(rect.getAttribute('x')).toFixed(1)}\n` +
          `transform x ${Number(gsap.getProperty(rect, 'x')).toFixed(1)}\n` +
          `width attr  ${Number(rect.getAttribute('width')).toFixed(1)}`;
      },
    });
    // a % suffix is kept while the number tweens (no unit conversion, though)
    gsap.to(meter, { duration: 2, ease: 'none', repeat: -1, yoyo: true, attr: { width: '90%' } });
  }, el);

  return () => ctx.revert();
};

export default mount;
