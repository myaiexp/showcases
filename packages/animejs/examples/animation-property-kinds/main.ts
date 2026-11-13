// One tile per animatable property kind: CSS property, transform, CSS variable, HTML attribute, JS object, SVG attribute
import { animate, utils, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { h, readout } from './dom.ts';
import { svgStar } from './svg.ts';
import './style.css';

const tile = (parent: HTMLElement, name: string): HTMLElement => {
  const t = h('div', 'tile', '', parent);
  const body = h('div', 'body', '', t);
  h('span', 'label', name, t);
  return body;
};

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const grid = h('div', 'grid', '', el);
  const loop = { loop: true, alternate: true, duration: 1400 };
  const anims: JSAnimation[] = [];

  // CSS property
  const css = h('div', 'box', '', tile(grid, 'CSS property'));
  anims.push(animate(css, { borderRadius: 24, 'background-color': '#F9F640', ...loop }));

  // CSS transforms
  const tr = h('div', 'box', '', tile(grid, 'CSS transforms'));
  anims.push(animate(tr, { x: 24, rotate: '1turn', scale: 0.7, ...loop }));

  // CSS variable (set first, as the docs do, so the variable drives the property)
  const vr = h('div', 'box', '', tile(grid, 'CSS variable'));
  utils.set(vr, { '--radius': '4px', '--x': '0px', borderRadius: () => 'var(--radius)', translateX: () => 'var(--x)' });
  anims.push(animate(vr, { '--radius': '24px', '--x': '24px', ...loop }));

  // HTML attribute
  const attrBody = tile(grid, 'HTML attribute');
  const input = h('input', '', '', attrBody);
  input.type = 'range';
  input.min = '0';
  input.max = '1000';
  input.value = '0';
  anims.push(animate(input, { value: 1000, modifier: utils.round(0), ...loop }));

  // JS object property
  const objBody = tile(grid, 'JS object property');
  const $v = readout(objBody, 'number', '1337');
  const obj = { number: 1337, unit: '42%' };
  anims.push(
    animate(obj, {
      number: 50,
      unit: '100%',
      modifier: utils.round(0),
      onRender: () => ($v.textContent = `${obj.number} / ${obj.unit}`),
      ...loop,
    }),
  );

  // SVG attribute
  const { svg, polygon } = svgStar();
  tile(grid, 'SVG attribute').append(svg);
  anims.push(animate(polygon, { points: '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100', ...loop }));

  return () => anims.forEach((a) => a.revert());
};

export default mount;
