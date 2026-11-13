// Unit conversion (px to % / rem / turn) and a unitless number that inherits the previous unit
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h, readout } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const lane = h('div', 'lane', '', stage);
  const sq = h('div', 'sq', '', lane);
  h('span', 'tag', "width '25%', x '15rem', rotate '.75turn'", lane);

  const bar = h('div', 'bar', '', stage);
  const $w = readout(stage, 'bar width', '0%');
  h('span', 'note', "'50%' first, then the bare number 75 inherits the %", stage);

  const anims: JSAnimation[] = [];
  anims.push(animate(sq, { width: '25%', x: '15rem', rotate: '.75turn', loop: true, alternate: true, duration: 1800 }));

  let cancelled = false;
  const growBar = (): void => {
    bar.style.width = '0%';
    const report = (): void => {
      $w.textContent = bar.style.width;
    };
    const first = animate(bar, { width: '50%', duration: 900, onRender: report });
    anims.push(first);
    first.then(() => {
      if (cancelled) return;
      anims.push(animate(bar, { width: 75, duration: 900, onRender: report }));
    });
  };
  growBar();

  let timer = 0;
  if (preview) timer = window.setInterval(growBar, 3000);
  else button(h('div', 'controls', '', stage), 'Replay bar', growBar, true);

  return () => {
    cancelled = true;
    window.clearInterval(timer);
    anims.forEach((a) => a.revert());
  };
};

export default mount;
