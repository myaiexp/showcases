// Function-based values: per-target x, y, scale, rotate, delay and duration, re-rolled with refresh()
import { animate, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const k = preview ? 0.5 : 1;
  const field = h('div', 'field', '', stage);
  const squares: HTMLElement[] = [];
  for (let i = 0; i < 5; i++) {
    const s = h('div', 'sq', '', field);
    s.dataset.x = String(Math.round((60 + ((i * 70) % 250)) * k));
    squares.push(s);
  }

  const anim = animate(squares, {
    x: (target: unknown) => (target as HTMLElement).dataset.x as string,
    y: (_: unknown, i = 0) => i * 10,
    scale: (_: unknown, i = 0, targets: ArrayLike<unknown> = []) => (targets.length - i) * 0.3,
    rotate: () => utils.random(-360, 360),
    borderRadius: () => `+=${utils.random(0, 8)}`,
    duration: () => utils.random(900, 1400),
    delay: () => utils.random(0, 300),
    ease: 'outElastic(1, .5)',
    autoplay: false,
  });

  // refresh() recomputes every function-based value; restart() plays it again.
  const reroll = (): void => {
    anim.restart().refresh();
  };
  reroll();

  let timer = 0;
  if (preview) timer = window.setInterval(reroll, 2600);
  else button(h('div', 'controls', '', stage), 'Re-roll values', reroll, true);

  return () => {
    window.clearInterval(timer);
    anim.revert();
  };
};

export default mount;
