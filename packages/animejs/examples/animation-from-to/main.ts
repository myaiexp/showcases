// Tween from and to objects: animate from a value to the current one, and from the current one to a value
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const make = (tag: string): HTMLElement => {
    const lane = h('div', 'lane', '', stage);
    const sq = h('div', 'sq', '', lane);
    h('span', 'tag', tag, lane);
    return sq;
  };
  const fromSq = make('from: animates to the current value');
  const toSq = make('to: animates from the current value');
  const bothSq = make('to: [start, end]');

  const loop = { loop: true, alternate: true, loopDelay: 400 };
  const anims: JSAnimation[] = [
    animate(fromSq, {
      opacity: { from: 0.2 },
      translateX: { from: '16rem' },
      rotate: { from: '-.75turn', ease: 'inOutQuad' },
      duration: 1600,
      ...loop,
    }),
    animate(toSq, {
      translateX: { to: '16rem', ease: 'outCubic' },
      rotate: { to: '.75turn', ease: 'inOutQuad' },
      duration: 1600,
      ...loop,
    }),
    animate(bothSq, { translateX: { to: ['4rem', '16rem'] }, duration: 1600, ...loop }),
  ];

  if (!preview) {
    button(h('div', 'controls', '', stage), 'Restart', () => anims.forEach((a) => a.restart()), true);
  }

  return () => anims.forEach((a) => a.revert());
};

export default mount;
