// stretch() re-times a staggered animation to a total duration chosen on a slider
import { animate, stagger, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const readout = document.createElement('pre');
  readout.className = 'readout';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const squares: HTMLElement[] = [];
  for (let i = 0; i < 3; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    const sq = document.createElement('div');
    sq.className = 'square';
    row.append(sq);
    stage.append(row);
    squares.push(sq);
  }
  el.append(readout, stage);

  const animation: JSAnimation = animate(squares, {
    x: preview ? '10rem' : '14rem',
    ease: 'inOutSine',
    delay: stagger(200),
  });

  const stretchTo = (ms: number): void => {
    readout.textContent = `stretch(${ms}) - total duration ${ms} ms`;
    animation.stretch(ms).restart();
  };
  stretchTo(1000);

  if (preview) {
    const steps = [600, 1800, 1000, 300];
    let i = 0;
    const timer = window.setInterval(() => stretchTo(steps[i++ % steps.length] ?? 1000), 2200);
    return () => {
      window.clearInterval(timer);
      animation.revert();
    };
  }

  const range = document.createElement('input');
  range.type = 'range';
  range.min = '100';
  range.max = '2000';
  range.step = '100';
  range.value = '1000';
  range.className = 'range';
  const onInput = (): void => stretchTo(+range.value);
  range.addEventListener('input', onInput);
  el.append(range);

  return () => {
    range.removeEventListener('input', onInput);
    animation.revert();
  };
};

export default mount;
