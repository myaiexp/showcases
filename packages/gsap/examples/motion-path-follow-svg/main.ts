// MotionPath: a shape follows an SVG path with align, alignOrigin, autoRotate, start and end
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(MotionPathPlugin);

const NS = 'http://www.w3.org/2000/svg';
const PATH_D =
  'M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37';

const mount: Mount = (el, { preview }) => {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '-20 0 557 190');
  svg.classList.add('stage');
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', PATH_D);
  path.classList.add('track');
  // An arrow pointing right, centred on its own origin.
  const arrow = document.createElementNS(NS, 'polygon');
  arrow.setAttribute('points', '-14,-10 14,0 -14,10 -8,0');
  arrow.classList.add('arrow');
  svg.append(path, arrow);
  el.append(svg);

  const opts = { autoRotate: 'true', start: 0, end: 1 };
  const readout = document.createElement('p');
  readout.className = 'readout';
  let tween: gsap.core.Tween | undefined;

  const ctx = gsap.context(() => {}, el);
  const run = (): void => {
    ctx.add(() => {
      tween?.kill();
      const autoRotate = opts.autoRotate === 'false' ? false : opts.autoRotate === '90' ? 90 : true;
      readout.textContent = `motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: ${autoRotate}, start: ${opts.start}, end: ${opts.end} }`;
      tween = gsap.to(arrow, {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate, start: opts.start, end: opts.end },
        transformOrigin: '50% 50%',
        duration: 4,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    });
  };
  run();

  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const slider = (label: string, value: number, set: (v: number) => void): HTMLLabelElement => {
      const l = document.createElement('label');
      const out = document.createElement('span');
      const r = document.createElement('input');
      r.type = 'range';
      r.min = '0';
      r.max = '1';
      r.step = '0.05';
      r.value = String(value);
      out.textContent = r.value;
      r.addEventListener('input', () => {
        out.textContent = r.value;
        set(Number(r.value));
        run();
      });
      l.append(`${label} `, r, ' ', out);
      return l;
    };
    const rotLabel = document.createElement('label');
    const sel = document.createElement('select');
    for (const v of ['true', '90', 'false']) sel.append(new Option(v, v));
    sel.addEventListener('change', () => {
      opts.autoRotate = sel.value;
      run();
    });
    rotLabel.append('autoRotate ', sel);
    controls.append(
      rotLabel,
      slider('start', opts.start, (v) => (opts.start = v)),
      slider('end', opts.end, (v) => (opts.end = v)),
    );
    el.append(controls, readout);
  }

  return () => {
    ctx.revert();
    tween?.kill();
  };
};

export default mount;
