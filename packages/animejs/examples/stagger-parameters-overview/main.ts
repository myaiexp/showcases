// Stagger parameters, one at a time: start, reversed, ease, modifier, use and total on a row of squares
import { animate, stagger, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const COUNT = 12;
const MODES = [
  { name: 'start', code: "stagger(80, { start: 600 })", delay: () => stagger(80, { start: 600 }) },
  { name: 'reversed', code: "stagger(80, { reversed: true })", delay: () => stagger(80, { reversed: true }) },
  { name: 'ease', code: "stagger([0, 880], { ease: 'inOut(3)' })", delay: () => stagger([0, 880], { ease: 'inOut(3)' }) },
  { name: 'modifier', code: 'stagger(80, { modifier: v => Math.round(v / 240) * 240 })', delay: () => stagger(80, { modifier: (v: number) => Math.round(v / 240) * 240 }) },
  { name: 'use', code: "stagger(80, { use: 'data-index' })", delay: () => stagger(80, { use: 'data-index' }) },
  { name: 'total', code: "stagger(240, { use: 'data-index', total: 4, reversed: true })", delay: () => stagger(240, { use: 'data-index', total: 4, reversed: true }) },
];

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';
  // data-index is the custom order for `use` and `total`: a repeating 0..3 then a shuffle for `use`.
  const squares = Array.from({ length: COUNT }, (_, i) => {
    const sq = document.createElement('div');
    sq.className = 'sq';
    sq.style.setProperty('--i', String(i));
    row.append(sq);
    return sq;
  });
  const shuffled = utils.shuffle(Array.from({ length: COUNT }, (_, i) => i));
  el.append(row);

  const code = document.createElement('pre');
  code.className = 'code';
  el.append(code);

  let anim: ReturnType<typeof animate> | null = null;
  let current = 0;
  const select = (index: number): void => {
    current = index;
    const mode = MODES[index];
    if (!mode) return;
    anim?.revert();
    squares.forEach((sq, i) => {
      sq.setAttribute('data-index', String(mode.name === 'total' ? i % 4 : shuffled[i]));
    });
    code.textContent = `delay: ${mode.code}`;
    anim = animate(squares, {
      y: [0, -36],
      duration: 400,
      ease: 'outQuad',
      alternate: true,
      loop: true,
      loopDelay: 1000,
      delay: mode.delay(),
    });
    buttons.forEach((b, i) => b.classList.toggle('on', i === index));
  };

  const buttons: HTMLButtonElement[] = [];
  let timer = 0;
  if (preview) {
    select(0);
    timer = window.setInterval(() => select((current + 1) % MODES.length), 3600);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    MODES.forEach((m, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = m.name;
      b.addEventListener('click', () => select(i));
      buttons.push(b);
      panel.append(b);
    });
    el.append(panel);
    select(0);
  }

  return () => {
    window.clearInterval(timer);
    anim?.revert();
  };
};

export default mount;
