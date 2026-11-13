// MorphSVG: loop a square into a star while tuning shapeIndex, type and map
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(MorphSVGPlugin);

const NS = 'http://www.w3.org/2000/svg';
const SQUARE = 'M10,10 L90,10 L90,90 L10,90z';

// Ten points alternating between an outer and an inner radius make a five-pointed star.
const starPath = (): string => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 46 : 20;
    const a = (Math.PI * i) / 5 - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(' L')}z`;
};

const mount: Mount = (el, { preview }) => {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.classList.add('stage');
  const target = document.createElementNS(NS, 'path');
  target.setAttribute('d', starPath());
  target.classList.add('target');
  const shape = document.createElementNS(NS, 'path');
  shape.setAttribute('d', SQUARE);
  shape.classList.add('shape');
  svg.append(target, shape);
  el.append(svg);

  const opts = { shapeIndex: 0, type: 'linear' as 'linear' | 'rotational', map: 'size' as 'size' | 'position' | 'complexity' };
  const readout = document.createElement('p');
  readout.className = 'readout';
  let tween: gsap.core.Tween | undefined;

  const ctx = gsap.context(() => {}, el);
  const run = (): void => {
    ctx.add(() => {
      tween?.kill();
      gsap.set(shape, { morphSVG: SQUARE });
      readout.textContent = `morphSVG: { shape: star, shapeIndex: ${opts.shapeIndex}, type: "${opts.type}", map: "${opts.map}" }`;
      tween = gsap.to(shape, {
        duration: 1.6,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.3,
        morphSVG: { shape: target, ...opts },
      });
    });
  };
  run();

  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const idxLabel = document.createElement('label');
    const idxOut = document.createElement('span');
    const idx = document.createElement('input');
    idx.type = 'range';
    idx.min = '-5';
    idx.max = '10';
    idx.step = '1';
    idx.value = '0';
    idx.addEventListener('input', () => {
      opts.shapeIndex = Number(idx.value);
      idxOut.textContent = idx.value;
      run();
    });
    idxOut.textContent = '0';
    idxLabel.append('shapeIndex ', idx, ' ', idxOut);
    const pick = <T extends string>(label: string, values: T[], set: (v: T) => void): HTMLLabelElement => {
      const l = document.createElement('label');
      const s = document.createElement('select');
      for (const v of values) s.append(new Option(v, v));
      s.addEventListener('change', () => {
        set(s.value as T);
        run();
      });
      l.append(`${label} `, s);
      return l;
    };
    controls.append(
      idxLabel,
      pick('type', ['linear', 'rotational'], (v) => (opts.type = v)),
      pick('map', ['size', 'position', 'complexity'], (v) => (opts.map = v)),
    );
    el.append(controls, readout);
  }

  return () => {
    ctx.revert();
    tween?.kill();
  };
};

export default mount;
