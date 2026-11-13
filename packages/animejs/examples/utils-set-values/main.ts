// utils.set() applying several properties at once, and reverting them through the returned instance
import { stagger, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';
  const squares = Array.from({ length: 6 }, () => {
    const sq = document.createElement('div');
    sq.className = 'sq';
    row.append(sq);
    return sq;
  });
  el.append(row);

  const colors = ['#ff6b6b', '#ffb347', '#ffe66d'];
  let setter: ReturnType<typeof utils.set> | null = null;
  const readout = document.createElement('pre');
  readout.className = 'readout';

  const describe = (): void => {
    const sq = squares[0] as HTMLElement;
    readout.textContent = setter
      ? `set. first square: y = ${utils.get(sq, 'y')}, scale = ${utils.get(sq, 'scale')}`
      : 'reverted: no inline styles from set()';
  };
  const setStyles = (): void => {
    setter?.revert();
    setter = utils.set(squares, {
      borderRadius: '50%',
      y: () => utils.random(-1, 1, 1) + 'rem',
      scale: stagger(0.1, { start: 0.25, ease: 'out' }),
      backgroundColor: () => utils.randomPick(colors),
    });
    describe();
  };
  const revertStyles = (): void => {
    setter?.revert();
    setter = null;
    describe();
  };

  let timer = 0;
  if (preview) {
    let on = false;
    const tick = (): void => {
      on = !on;
      if (on) setStyles(); else revertStyles();
    };
    tick();
    timer = window.setInterval(tick, 1100);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const mk = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      panel.append(b);
    };
    mk('Set styles', setStyles);
    mk('Revert styles', revertStyles);
    el.append(panel, readout);
    describe();
  }

  return () => {
    window.clearInterval(timer);
    setter?.revert();
  };
};

export default mount;
