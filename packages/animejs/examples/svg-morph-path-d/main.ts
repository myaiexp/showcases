// morphTo on path `d`: a path morphs between hand-written outlines, cycling or on button click
import { animate, svg, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';

const star = (): string => {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 24 : 52;
    const a = (Math.PI * i) / 5 - Math.PI / 2;
    d += `${i ? 'L' : 'M'}${utils.round(152 + r * Math.cos(a), 1)} ${utils.round(56 + r * Math.sin(a), 1)} `;
  }
  return `${d}Z`;
};

const SHAPES: { name: string; d: string }[] = [
  { name: 'blob', d: 'M152 8 C 200 8 232 36 232 56 C 232 80 200 104 152 104 C 104 104 72 80 72 56 C 72 36 104 8 152 8 Z' },
  { name: 'triangle', d: 'M152 8 L 236 104 L 68 104 Z' },
  { name: 'star', d: star() },
  { name: 'heart', d: 'M152 104 C 60 48 104 0 152 36 C 200 0 244 48 152 104 Z' },
];

const mount: Mount = (el, { preview }) => {
  const root = document.createElementNS(NS, 'svg');
  root.setAttribute('viewBox', '0 0 304 112');
  const shown = document.createElementNS(NS, 'path');
  const hidden = document.createElementNS(NS, 'path');
  hidden.setAttribute('style', 'opacity: 0');
  shown.setAttribute('d', SHAPES[0]?.d ?? '');
  root.append(shown, hidden);
  el.append(root);

  let current = 0;
  let stopped = false;
  let animation: ReturnType<typeof animate> | undefined;
  const morphTo = (index: number, delay = 0, then?: () => void): void => {
    current = index;
    // The destination `d` lives on the hidden path; morphTo() reads it. It is set as an
    // attribute: `d` is also a CSS property, and morphTo() measures the attribute geometry.
    hidden.setAttribute('d', SHAPES[index]?.d ?? '');
    animation = animate(shown, {
      d: svg.morphTo(hidden),
      ease: 'inOutQuad',
      duration: 900,
      delay,
      onComplete: () => then?.(),
    });
  };
  const cycle = (): void => {
    if (stopped) return;
    morphTo((current + 1) % SHAPES.length, 500, cycle);
  };

  if (preview) {
    cycle();
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    SHAPES.forEach(({ name }, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = name;
      b.addEventListener('click', () => morphTo(i));
      bar.append(b);
    });
    el.append(bar);
  }

  return () => {
    stopped = true;
    animation?.revert();
  };
};

export default mount;
