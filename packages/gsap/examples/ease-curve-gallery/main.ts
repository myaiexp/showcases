// Plots every core ease family as a curve sampled from gsap.parseEase(), with a dot riding each curve
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';
const FAMILIES = ['none', 'power1', 'power2', 'power3', 'power4', 'back', 'elastic', 'bounce', 'circ', 'expo', 'sine', 'steps(5)'];
const PREVIEW_FAMILIES = ['power2', 'back', 'elastic', 'bounce']; // a 2x2 set that fits the 200px card whole
const TYPES = ['out', 'in', 'inOut'] as const;
const W = 100;
const H = 80;
const PAD = 8;
const Y_MIN = -0.35; // back and elastic overshoot below 0 and above 1
const Y_MAX = 1.35;

const nameFor = (family: string, type: string): string =>
  family === 'none' || family.startsWith('steps') ? family : `${family}.${type}`;

const svgEl = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>): SVGElementTagNameMap[K] => {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
};

const mount: Mount = (el, { preview }) => {
  const families = preview ? PREVIEW_FAMILIES : FAMILIES;
  const px = gsap.utils.mapRange(0, 1, PAD, W - PAD);
  const py = gsap.utils.mapRange(Y_MIN, Y_MAX, H - PAD, PAD); // svg y grows downward

  const grid = document.createElement('div');
  grid.className = preview ? 'curves small' : 'curves';
  const cells = families.map((family) => {
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}` });
    svg.append(
      svgEl('line', { x1: String(PAD), x2: String(W - PAD), y1: String(py(0)), y2: String(py(0)), class: 'guide' }),
      svgEl('line', { x1: String(PAD), x2: String(W - PAD), y1: String(py(1)), y2: String(py(1)), class: 'guide' }),
    );
    const path = svgEl('path', { class: 'curve' });
    const dot = svgEl('circle', { r: '3.5', class: 'dot', cx: String(PAD), cy: String(py(0)) });
    const label = svgEl('text', { x: '4', y: '9', class: 'name' });
    svg.append(path, dot, label);
    grid.append(svg);
    return { family, path, dot, label };
  });
  el.append(grid);

  let type: (typeof TYPES)[number] = 'out';
  let eases = cells.map((c) => gsap.parseEase(nameFor(c.family, type)));

  const draw = (): void => {
    eases = cells.map((c) => gsap.parseEase(nameFor(c.family, type)));
    cells.forEach((c, i) => {
      const ease = eases[i];
      if (!ease) return;
      let d = '';
      for (let s = 0; s <= 120; s++) {
        const t = s / 120;
        d += `${s ? 'L' : 'M'}${px(t).toFixed(1)},${py(ease(t)).toFixed(1)}`;
      }
      c.path.setAttribute('d', d);
      c.label.textContent = nameFor(c.family, type);
    });
  };

  const ctx = gsap.context(() => {
    const clock = { t: 0 };
    // A linear 0..1 clock; each dot sits at (t, ease(t)) so you see how time maps to progress.
    gsap.to(clock, {
      t: 1,
      duration: 2.4,
      ease: 'none',
      repeat: -1,
      repeatDelay: 0.4,
      onUpdate: () => {
        cells.forEach((c, i) => {
          const ease = eases[i];
          if (!ease) return;
          c.dot.setAttribute('cx', String(px(clock.t)));
          c.dot.setAttribute('cy', String(py(ease(clock.t))));
        });
      },
    });
  }, el);

  const setType = (next: (typeof TYPES)[number]): void => {
    type = next;
    draw();
  };
  draw();

  let timer = 0;
  if (preview) {
    let n = 0;
    timer = window.setInterval(() => setType(TYPES[++n % TYPES.length] ?? 'out'), 3000);
  } else {
    const bar = document.createElement('div');
    bar.className = 'types';
    for (const t of TYPES) {
      const b = document.createElement('button');
      b.className = t === type ? 'btn btn-primary' : 'btn';
      b.textContent = `.${t}`;
      b.addEventListener('click', () => {
        setType(t);
        for (const x of bar.querySelectorAll('button')) x.className = x === b ? 'btn btn-primary' : 'btn';
      });
      bar.append(b);
    }
    el.prepend(bar);
  }

  return () => {
    window.clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
