// Composition modes none, replace and blend when a hover animation interrupts a running scale loop
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { h } from './dom.ts';
import './style.css';

const MODES = ['none', 'replace', 'blend'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const row = h('div', 'row', '', el);
  const anims: JSAnimation[] = [];
  const squares = new Map<Mode, HTMLElement>();

  for (const mode of MODES) {
    const cell = h('div', 'cell', '', row);
    const sq = h('div', 'sq', '', cell);
    h('span', 'label', preview ? mode : `composition: '${mode}'`, cell);
    squares.set(mode, sq);
    anims.push(animate(sq, { scale: [0.5, 1], alternate: true, loop: true, duration: 750, composition: mode }));
  }

  const enter = (mode: Mode): void => {
    anims.push(animate(squares.get(mode)!, { scale: 1.5, duration: 350, composition: mode }));
  };
  const leave = (mode: Mode): void => {
    anims.push(animate(squares.get(mode)!, { scale: 1, duration: 250, composition: mode }));
  };

  const cleanups: (() => void)[] = [];
  let timer = 0;
  if (preview) {
    // No pointer in a card: fire the hover animations by script, one square after another.
    let i = 0;
    let inside = false;
    timer = window.setInterval(() => {
      const mode = MODES[Math.floor(i / 2) % MODES.length] as Mode;
      if (inside) leave(mode);
      else enter(mode);
      inside = !inside;
      i++;
    }, 700);
  } else {
    h('p', 'hint', 'Hover each square: it interrupts the running scale loop with a different composition mode.', el);
    for (const mode of MODES) {
      const sq = squares.get(mode)!;
      const onEnter = (): void => enter(mode);
      const onLeave = (): void => leave(mode);
      sq.addEventListener('mouseenter', onEnter);
      sq.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        sq.removeEventListener('mouseenter', onEnter);
        sq.removeEventListener('mouseleave', onLeave);
      });
    }
  }

  return () => {
    window.clearInterval(timer);
    cleanups.forEach((c) => c());
    anims.forEach((a) => a.revert());
  };
};

export default mount;
