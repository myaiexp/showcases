// utils.damp() vs utils.lerp(): smoothing a stepped clock at a low frame rate
import { animate, createTimer, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const mk = (name: string) => {
    const col = document.createElement('div');
    col.className = 'col';
    const clock = document.createElement('div');
    clock.className = 'clock';
    const label = document.createElement('div');
    label.className = 'label';
    const val = document.createElement('span');
    label.append(name, document.createElement('br'), val);
    col.append(clock, label);
    return { col, clock, val };
  };
  const input = mk('input');
  const damped = mk('damp()');
  const lerped = mk('lerp()');
  const stage = document.createElement('div');
  stage.className = 'stage';
  stage.append(input.col, damped.col, lerped.col);
  el.append(stage);

  let amount = 0.075;
  const source = animate(input.clock, {
    rotate: '1000turn',
    modifier: utils.snap(0.25),
    duration: 4000000,
    loop: true,
    ease: 'linear',
  });

  const turn = (n: Element): number => utils.get(n, 'rotate', false) as number;
  const fmt = (n: number): string => utils.roundPad(n % 1 < 0 ? n % 1 + 1 : n % 1, 2);
  const dampedLoop = createTimer({
    frameRate: 15,
    onUpdate: (clock) => {
      const next = utils.damp(turn(damped.clock), turn(input.clock), clock.deltaTime, amount);
      utils.set(damped.clock, { rotate: next + 'turn' });
      damped.val.textContent = fmt(next) + ' turn';
    },
  });
  const lerpedLoop = createTimer({
    frameRate: 15,
    onUpdate: () => {
      const next = utils.lerp(turn(lerped.clock), turn(input.clock), amount);
      utils.set(lerped.clock, { rotate: next + 'turn' });
      lerped.val.textContent = fmt(next) + ' turn';
      input.val.textContent = fmt(turn(input.clock)) + ' turn';
    },
  });

  if (!preview) {
    const panel = document.createElement('label');
    panel.className = 'panel';
    const text = document.createElement('span');
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '0.01';
    range.max = '0.5';
    range.step = '0.005';
    range.value = String(amount);
    const sync = (): void => {
      amount = +range.value;
      text.textContent = `amount ${utils.roundPad(amount, 3)}`;
    };
    range.addEventListener('input', sync);
    sync();
    panel.append(text, range);
    el.append(panel);
  }

  return () => {
    source.revert();
    dampedLoop.revert();
    lerpedLoop.revert();
  };
};

export default mount;
