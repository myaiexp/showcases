// Grid of cells whose wave origin (from) and displacement axis are chosen live
import { animate, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

type From = number | 'first' | 'center' | 'last' | 'random';
type Axis = 'x' | 'y' | undefined;

const mount: Mount = (el, { preview }) => {
  const cols = preview ? 9 : 11;
  const rows = preview ? 5 : 6;
  const grid = [cols, rows];

  const board = document.createElement('div');
  board.className = 'board';
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  const cells: HTMLElement[] = [];
  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cells.push(cell);
    board.append(cell);
  }
  el.append(board);

  let from: From = 'center';
  let axis: Axis;
  let anim: { revert(): unknown } | undefined;
  let next: (() => void) | undefined;

  const play = (): void => {
    anim?.revert();
    // The axis parameter only applies when one is chosen.
    const sp = axis ? { grid, from, axis } : { grid, from };
    anim = animate(cells, {
      x: [{ to: stagger('-10px', sp) }, { to: 0, ease: 'inOutQuad' }],
      y: [{ to: stagger('-10px', sp) }, { to: 0, ease: 'inOutQuad' }],
      scale: [{ to: 0.4 }, { to: 1 }],
      backgroundColor: [{ to: '#ffffff' }, { to: '#4f8cff' }],
      delay: stagger(60, { grid, from }),
      onComplete: () => next?.(),
    });
  };

  if (preview) {
    const origins: From[] = ['center', 0, 'last', 'random', cols - 1];
    const axes: Axis[] = [undefined, 'x', 'y', undefined, 'x'];
    let n = 0;
    next = () => {
      from = origins[n % origins.length]!;
      axis = axes[n % axes.length];
      n++;
      play();
    };
    next();
  } else {
    const ui = document.createElement('div');
    ui.className = 'controls';
    const mk = (label: string, opts: string[], onPick: (v: string) => void): void => {
      const wrap = document.createElement('label');
      wrap.textContent = label;
      const sel = document.createElement('select');
      for (const o of opts) sel.append(new Option(o, o));
      sel.addEventListener('change', () => onPick(sel.value));
      wrap.append(sel);
      ui.append(wrap);
    };
    mk('from', ['center', 'first', 'last', 'random'], (v) => {
      from = v as From;
      play();
    });
    mk('axis', ['none', 'x', 'y'], (v) => {
      axis = v === 'none' ? undefined : (v as 'x' | 'y');
      play();
    });
    const hint = document.createElement('span');
    hint.className = 'hint';
    hint.textContent = 'Click a cell to start the wave there (from: index).';
    ui.append(hint);
    el.append(ui);
    cells.forEach((cell, i) =>
      cell.addEventListener('click', () => {
        from = i;
        play();
      }),
    );
    play();
  }

  return () => {
    next = undefined;
    anim?.revert();
  };
};

export default mount;
