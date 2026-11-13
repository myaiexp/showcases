// Flip: filter tiles with display:none, fading entering and leaving ones via onEnter/onLeave
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Flip);

const KINDS = ['red', 'green', 'blue'] as const;
type Filter = 'all' | (typeof KINDS)[number];

const mount: Mount = (el, { preview }) => {
  const grid = document.createElement('div');
  grid.className = 'grid';
  const tiles: HTMLElement[] = [];
  for (let i = 0; i < 12; i++) {
    const tile = document.createElement('div');
    tile.className = `tile ${KINDS[i % 3]}`;
    tile.dataset.kind = KINDS[i % 3];
    tiles.push(tile);
    grid.append(tile);
  }
  el.append(grid);

  const ctx = gsap.context(() => {}, el);

  let flip: gsap.core.Timeline | undefined;

  const apply = (filter: Filter): void => {
    const state = Flip.getState(tiles);
    for (const tile of tiles) {
      tile.style.display = filter === 'all' || tile.dataset.kind === filter ? '' : 'none';
    }
    // Created outside the context (ignore) so repeated filters don't pile up in ctx.data
    flip?.revert();
    ctx.ignore(() => {
      flip = Flip.from(state, {
        duration: 0.6,
        ease: 'power1.inOut',
        scale: true,
        absolute: true,
        // Tiles that were hidden and are now shown
        onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5 }),
        // Tiles that were shown and are now display:none; absolute keeps them visible while they fade
        onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0, duration: 0.5 }),
      });
    });
  };

  let timer = 0;
  const buttons: HTMLButtonElement[] = [];
  const setActive = (f: Filter): void => {
    for (const b of buttons) b.classList.toggle('btn-primary', b.dataset.filter === f);
  };
  if (preview) {
    const order: Filter[] = ['red', 'green', 'blue', 'all'];
    let n = 0;
    timer = window.setInterval(() => apply(order[n++ % order.length] ?? 'all'), 1800);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    for (const f of ['all', ...KINDS] as Filter[]) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = f;
      b.dataset.filter = f;
      b.addEventListener('click', () => {
        apply(f);
        setActive(f);
      });
      buttons.push(b);
      controls.append(b);
    }
    el.append(controls);
    setActive('all');
  }

  return () => {
    window.clearInterval(timer);
    Flip.killFlipsOf(tiles);
    flip?.revert();
    ctx.revert();
  };
};

export default mount;
