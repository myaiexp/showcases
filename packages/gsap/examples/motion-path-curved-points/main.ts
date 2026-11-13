// MotionPath: a dot travels a curve plotted through an array of points, with adjustable curviness
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(MotionPathPlugin);

const NS = 'http://www.w3.org/2000/svg';
const ANCHORS = [
  { x: 50, y: 130 },
  { x: 300, y: 10 },
  { x: 510, y: 100 },
  { x: 700, y: 190 },
  { x: 850, y: 100 },
];

const mount: Mount = (el, { preview }) => {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 900 200');
  svg.classList.add('stage');
  const curve = document.createElementNS(NS, 'path');
  curve.classList.add('curve');
  svg.append(curve);
  for (const a of ANCHORS) {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', String(a.x));
    c.setAttribute('cy', String(a.y));
    c.setAttribute('r', '6');
    c.classList.add('anchor');
    svg.append(c);
  }
  const dot = document.createElementNS(NS, 'circle');
  dot.setAttribute('r', '14');
  dot.classList.add('dot');
  svg.append(dot);
  el.append(svg);

  const readout = document.createElement('p');
  readout.className = 'readout';
  let tween: gsap.core.Tween | undefined;

  const ctx = gsap.context(() => {}, el);
  const run = (curviness: number): void => {
    ctx.add(() => {
      tween?.kill();
      // Draw the same curve the plugin plots through the points.
      const rawPath = MotionPathPlugin.arrayToRawPath(ANCHORS, { curviness });
      curve.setAttribute('d', MotionPathPlugin.rawPathToString(rawPath));
      readout.textContent = `motionPath: { path: points, curviness: ${curviness} }`;
      gsap.set(dot, { x: 0, y: 0 });
      tween = gsap.to(dot, {
        motionPath: { path: ANCHORS, curviness, fromCurrent: false },
        duration: 4,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    });
  };

  if (preview) {
    run(1);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const label = document.createElement('label');
    const out = document.createElement('span');
    const r = document.createElement('input');
    r.type = 'range';
    r.min = '0';
    r.max = '2';
    r.step = '0.1';
    r.value = '1';
    out.textContent = r.value;
    r.addEventListener('input', () => {
      out.textContent = r.value;
      run(Number(r.value));
    });
    label.append('curviness ', r, ' ', out);
    controls.append(label);
    el.append(controls, readout);
    run(1);
  }

  return () => {
    ctx.revert();
    tween?.kill();
  };
};

export default mount;
