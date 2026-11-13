// animate() fed four kinds of target: a CSS selector, a DOM element, a JS object, and an array of both
import { animate, utils, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { h, readout } from './dom.ts';
import './style.css';

const lane = (parent: HTMLElement, tag: string): HTMLElement => {
  const l = h('div', 'lane', '', parent);
  h('div', 'sq', '', l);
  h('span', 'tag', tag, l);
  return l;
};

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const bySelector = lane(stage, "'.by-selector'");
  bySelector.classList.add('by-selector');
  const byElement = lane(stage, 'DOM element');
  const byObject = lane(stage, '{ x: 0 }');
  const byArray = lane(stage, '[object, element]');
  const $obj = readout(stage, 'object.x');

  const vector = { x: 0 };
  const pair = { x: 0 };
  const loopOpts = { loop: true, alternate: true, duration: preview ? 1200 : 1800 };
  const anims: JSAnimation[] = [];

  // 1. CSS selector string
  anims.push(animate('.by-selector .sq', { x: 280, ...loopOpts }));
  // 2. DOM element
  anims.push(animate(byElement.querySelector('.sq') as HTMLElement, { x: 280, ...loopOpts }));
  // 3. Plain JS object, rendered into a square by onRender
  const objSquare = byObject.querySelector('.sq') as HTMLElement;
  anims.push(
    animate(vector, {
      x: 280,
      modifier: utils.round(0),
      onRender: () => {
        objSquare.style.transform = `translateX(${vector.x}px)`;
        $obj.textContent = String(vector.x);
      },
      ...loopOpts,
    }),
  );
  // 4. Array mixing an object and an element
  const arrSquare = byArray.querySelector('.sq') as HTMLElement;
  anims.push(
    animate([pair, arrSquare], {
      x: 280,
      ...loopOpts,
      onRender: () => (arrSquare.style.opacity = String(0.4 + (pair.x / 280) * 0.6)),
    }),
  );

  return () => anims.forEach((a) => a.revert());
};

export default mount;
