// Rows of bars whose delay order comes from data-index, with reversed, start and seeded jitter
import { animate, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const ORDER = [2, 0, 3, 1, 5, 4, 7, 6];

const mount: Mount = (el, { preview }) => {
  const list = document.createElement('div');
  list.className = 'list';
  const bars: HTMLElement[] = [];
  ORDER.forEach((idx) => {
    const line = document.createElement('div');
    line.className = 'line';
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.dataset.index = String(idx);
    const label = document.createElement('span');
    label.textContent = `data-index="${idx}"`;
    line.append(bar, label);
    list.append(line);
    bars.push(bar);
  });
  el.append(list);

  const state = { reversed: false, jitter: 0, seeded: true, start: 0 };
  let anim: { revert(): unknown } | undefined;

  const play = (): void => {
    anim?.revert();
    anim = animate(bars, {
      width: ['0%', '100%'],
      // use reads the order from the data-index attribute instead of the DOM order.
      delay: stagger(180, {
        use: 'data-index',
        reversed: state.reversed,
        start: state.start,
        ...(state.jitter ? { jitter: state.jitter, seed: state.seeded } : {}),
      }),
      duration: 500,
      ease: 'outQuad',
      loop: true,
      loopDelay: 400,
      alternate: true,
    });
  };

  if (preview) {
    let n = 0;
    play();
    const timer = window.setInterval(() => {
      n++;
      state.reversed = n % 2 === 1;
      state.jitter = n % 4 === 3 ? 150 : 0;
      play();
    }, 3200);
    return () => {
      window.clearInterval(timer);
      anim?.revert();
    };
  }

  const ui = document.createElement('div');
  ui.className = 'controls';
  const add = (label: string, input: HTMLInputElement, onInput: () => void): void => {
    const l = document.createElement('label');
    l.textContent = label;
    l.append(input);
    input.addEventListener('input', onInput);
    ui.append(l);
  };
  const rev = Object.assign(document.createElement('input'), { type: 'checkbox' });
  add('reversed', rev, () => {
    state.reversed = rev.checked;
    play();
  });
  const seed = Object.assign(document.createElement('input'), { type: 'checkbox', checked: true });
  add('seed (repeatable jitter)', seed, () => {
    state.seeded = seed.checked;
    play();
  });
  const jit = Object.assign(document.createElement('input'), { type: 'range', min: '0', max: '300', value: '0' });
  add('jitter (ms)', jit, () => {
    state.jitter = Number(jit.value);
    play();
  });
  const start = Object.assign(document.createElement('input'), { type: 'range', min: '0', max: '1000', step: '100', value: '0' });
  add('start (ms)', start, () => {
    state.start = Number(start.value);
    play();
  });
  el.append(ui);
  play();

  return () => anim?.revert();
};

export default mount;
