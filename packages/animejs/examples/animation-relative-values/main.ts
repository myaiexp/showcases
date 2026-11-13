// Relative tween values: += adds, -= subtracts, *= multiplies the current rotation
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h, readout } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const clock = h('div', 'clock', '', stage);
  h('div', 'hand', '', clock);
  const $op = readout(stage, 'last value', "'+=90'");

  let current: JSAnimation | undefined;
  const run = (value: string): void => {
    current = animate(clock, { rotate: value, duration: 600 });
    $op.textContent = `'${value}'`;
  };

  let timer = 0;
  if (preview) {
    const seq = ['+=90', '+=90', '-=90', '*=.5', '+=180'];
    let i = 0;
    timer = window.setInterval(() => run(seq[i++ % seq.length] as string), 900);
  } else {
    const controls = h('div', 'controls', '', stage);
    button(controls, '+= 90', () => run('+=90'));
    button(controls, '-= 90', () => run('-=90'));
    button(controls, '*= .5', () => run('*=.5'));
  }

  return () => {
    window.clearInterval(timer);
    current?.revert();
  };
};

export default mount;
