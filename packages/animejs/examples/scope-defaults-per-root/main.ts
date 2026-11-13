// Scope defaults per root: each scope sets its own `defaults.ease`, inherited by the animation inside it
import { animate, createScope, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'rows is-preview' : 'rows';
  const rows: HTMLElement[] = [];
  for (let i = 0; i < 3; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    const track = document.createElement('div');
    track.className = 'track';
    const square = document.createElement('div');
    square.className = 'square';
    track.append(square);
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = `ease: out(${1 + i})`;
    row.append(track, label);
    rows.push(row);
    wrap.append(row);
  }
  el.append(wrap);

  // One scope per row. The animation sets no `ease`, so it takes the scope's default.
  const distance = preview ? '7rem' : '17rem';
  const scopes = rows.map((row, i) =>
    createScope({ root: row, defaults: { ease: `out(${1 + i})` } }).add(() => {
      animate(utils.$('.square'), {
        x: distance,
        loop: true,
        alternate: true,
        duration: 1400,
      });
    }),
  );

  return () => {
    scopes.forEach(s => s.revert());
  };
};

export default mount;
