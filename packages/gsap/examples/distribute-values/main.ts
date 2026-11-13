// A grid of tiles whose scale comes from gsap.utils.distribute() with live config controls
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const FROMS = ['start', 'center', 'end', 'edges', 'random'] as const;
const EASES = ['none', 'power1.in', 'power2.out', 'power3.inOut', 'sine.inOut'];
const ROWS = 7;
const COLS = 9;

const mount: Mount = (el, { preview }) => {
  const grid = document.createElement('div');
  grid.className = preview ? 'grid small' : 'grid';
  const tiles: HTMLElement[] = [];
  for (let i = 0; i < ROWS * COLS; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tiles.push(tile);
    grid.append(tile);
  }
  el.append(grid);

  const state = { from: 'center' as (typeof FROMS)[number], ease: 'power1.inOut', amount: 0.7 };
  const readout = document.createElement('p');
  readout.className = 'readout';

  const ctx = gsap.context(() => {
    gsap.set(tiles, { scale: 0.2 });
  }, el);
  let tween: gsap.core.Tween | undefined;

  const play = (): void => {
    tween?.kill();
    ctx.add(() => {
      // distribute() returns a function-based value: each tile gets base + a share of amount.
      const scale = gsap.utils.distribute({
        base: 0.2,
        amount: state.amount,
        from: state.from,
        grid: [ROWS, COLS],
        ease: state.ease,
      });
      tween = gsap.fromTo(
        tiles,
        { scale: 0.2 },
        { scale, duration: 1, ease: 'power2.inOut', repeat: -1, yoyo: true, repeatDelay: 0.3 },
      );
    });
    readout.textContent = `distribute({ base: 0.2, amount: ${state.amount}, from: "${state.from}", grid: [${ROWS}, ${COLS}], ease: "${state.ease}" })`;
  };

  const makeSelect = (label: string, options: readonly string[], value: string, on: (v: string) => void) => {
    const wrap = document.createElement('label');
    wrap.textContent = `${label} `;
    const select = document.createElement('select');
    for (const o of options) select.append(new Option(o, o, false, o === value));
    select.addEventListener('change', () => on(select.value));
    wrap.append(select);
    return wrap;
  };

  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const amountWrap = document.createElement('label');
    amountWrap.textContent = 'amount ';
    const amount = document.createElement('input');
    amount.type = 'range';
    amount.min = '0';
    amount.max = '0.8';
    amount.step = '0.1';
    amount.value = String(state.amount);
    amount.addEventListener('input', () => {
      state.amount = Number(amount.value);
      play();
    });
    amountWrap.append(amount);
    controls.append(
      makeSelect('from', FROMS, state.from, (v) => {
        state.from = v as typeof state.from;
        play();
      }),
      makeSelect('ease', [...EASES, state.ease], state.ease, (v) => {
        state.ease = v;
        play();
      }),
      amountWrap,
    );
    el.append(controls, readout);
  }
  play();

  return () => {
    tween?.kill();
    ctx.revert();
  };
};

export default mount;
