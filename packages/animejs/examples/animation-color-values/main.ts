// Colour value formats (HEX, RGB, HSL and their alpha forms) animated on the same property
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h } from './dom.ts';
import './style.css';

const FORMATS: [string, string][] = [
  ['HEX', '#FF4B4B'],
  ['RGB', 'rgb(255, 168, 40)'],
  ['HSL', 'hsl(44, 100%, 59%)'],
  ['HEXA', '#FF4B4B33'],
  ['RGBA', 'rgba(255, 168, 40, .2)'],
  ['HSLA', 'hsla(44, 100%, 59%, .2)'],
];

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const row = h('div', 'row', '', stage);
  const anims: JSAnimation[] = [];

  for (const [name, value] of FORMATS) {
    const cell = h('div', 'cell', '', row);
    const circle = h('div', 'circle', '', cell);
    h('span', 'label', name, cell);
    if (!preview) h('code', 'code', value, cell);
    anims.push(animate(circle, { background: value, loop: true, alternate: true, duration: 1500 }));
  }

  if (!preview) {
    button(h('div', 'controls', '', stage), 'Restart all', () => anims.forEach((a) => a.restart()), true);
  }

  return () => anims.forEach((a) => a.revert());
};

export default mount;
