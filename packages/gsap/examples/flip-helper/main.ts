// Tiles are reordered in the DOM, and flip() animates them from where they were to where they ended up
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h, slider } from '../../shared/ui.ts';
import { flip } from './flip.ts';
import './style.css';

const COLORS = ['var(--accent)', 'var(--cyan)', 'var(--green)', 'var(--orange)', 'var(--purple)', 'var(--red)'];

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const grid = h('div', 'grid', '', root);
  const count = preview ? 8 : 12;
  const tiles = Array.from({ length: count }, (_, i) => {
    const t = h('div', 'tile', String(i + 1), grid);
    t.style.background = COLORS[i % COLORS.length] as string;
    return t;
  });

  const state = { duration: 0.7 };
  let last: gsap.core.Timeline | undefined;
  const ctx = gsap.context(() => {}, el);

  const change = (order: HTMLElement[]): void => {
    // flip() remembers every tile's old box, runs the change, then tweens from the old box
    ctx.ignore(() => {
      last = flip(tiles, () => grid.append(...order), { duration: state.duration, stagger: 0.04, ease: 'power2.inOut' });
    });
  };
  const shuffle = (): void => change(gsap.utils.shuffle([...tiles]));
  const inOrder = (): void => change([...tiles]);

  let timer: number | undefined;
  if (preview) {
    timer = window.setInterval(shuffle, 1800);
  } else {
    const bar = h('div', 'controls', '', root);
    btn('shuffle', shuffle, bar);
    btn('reverse', () => change([...grid.children].reverse() as HTMLElement[]), bar);
    btn('sort', inOrder, bar);
    slider('duration ', 0.2, 2, 0.1, state.duration, (v) => { state.duration = v; }, bar);
    h('p', 'readout', 'Click as fast as you like: a new flip() first finishes the previous one for the tiles it still owns.', root);
  }

  return () => {
    if (timer) window.clearInterval(timer);
    last?.progress(1).kill();
    ctx.revert();
  };
};

export default mount;
