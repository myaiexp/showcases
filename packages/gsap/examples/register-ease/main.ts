// Three eases written as plain functions, registered by name, then used as ease strings
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';
type EaseFn = (progress: number) => number;

const EASES: Array<{ name: string; fn: EaseFn }> = [
  { name: 'showcaseStairs', fn: (p) => Math.floor(p * 6) / 6 },
  { name: 'showcaseWobble', fn: (p) => 1 - Math.cos(p * Math.PI * 3.5) * (1 - p) },
  { name: 'showcasePulse', fn: (p) => p + Math.sin(p * Math.PI * 4) * 0.12 },
];

// An ease takes progress 0..1 and returns the eased value; it may leave 0..1 in between.
for (const { name, fn } of EASES) gsap.registerEase(name, fn);

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const T = preview ? 90 : 200;

  const rows = EASES.map(({ name, fn }) => {
    const row = document.createElement('div');
    row.className = 'row';
    const label = document.createElement('code');
    label.textContent = `ease: "${name.replace('showcase', '')}"`;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '-4 -4 108 108');
    svg.setAttribute('class', 'curve');
    const pts = Array.from({ length: 81 }, (_, i) => `${i * 1.25},${100 - fn(i / 80) * 100}`);
    const path = document.createElementNS(NS, 'polyline');
    path.setAttribute('points', pts.join(' '));
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', '5');
    svg.append(path, dot);
    const track = document.createElement('div');
    track.className = 'track';
    const box = document.createElement('div');
    box.className = 'box';
    track.append(box);
    row.append(label, svg, track);
    root.append(row);
    return { name, fn, box, dot };
  });
  el.append(root);

  const ctx = gsap.context(() => {
    for (const { name, fn, box, dot } of rows) {
      const tween: gsap.core.Tween = gsap.to(box, {
        x: T,
        duration: 2,
        ease: name, // the registered name works anywhere an ease string does
        repeat: -1,
        repeatDelay: 0.5,
        onUpdate: () => {
          const p = tween.progress(); // linear time; the box is at fn(p)
          dot.setAttribute('cx', String(p * 100));
          dot.setAttribute('cy', String(100 - fn(p) * 100));
        },
      });
    }
  }, el);

  return () => ctx.revert();
};

export default mount;
