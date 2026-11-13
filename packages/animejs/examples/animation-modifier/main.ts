// Modifier functions: round a value, wrap it with modulo, and a per-property cosine modifier
import { animate, utils, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const rows: [string, HTMLElement][] = ['utils.round(0)', 'v => v % 14', 'y: v => Math.cos(v) / 2'].map((name) => {
    const lane = h('div', 'lane', '', stage);
    const sq = h('div', 'sq', '', lane);
    h('span', 'tag', name, lane);
    return [name, sq];
  });

  const loop = { duration: 4000, loop: true, alternate: true };
  const anims: JSAnimation[] = [
    animate(rows[0]![1], { x: '17rem', modifier: utils.round(0), ...loop }),
    animate(rows[1]![1], { x: '70rem', modifier: (v: number) => v % 14, ...loop }),
    animate(rows[2]![1], { x: '17rem', y: { to: '70rem', modifier: (v: number) => Math.cos(v) / 2 }, ...loop }),
  ];

  if (!preview) {
    button(h('div', 'controls', '', stage), 'Restart', () => anims.forEach((a) => a.restart()), true);
  }

  return () => anims.forEach((a) => a.revert());
};

export default mount;
