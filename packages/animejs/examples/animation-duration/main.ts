// duration: three animations of 0, 500 and 2000 ms; 0 completes instantly on play
import { animate } from 'animejs';
import type { JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const DURATIONS = [0, 500, 2000];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const dots = DURATIONS.map((ms) => {
    const row = document.createElement('div');
    row.className = 'lane';
    const dot = document.createElement('div');
    dot.className = 'dot';
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = `duration: ${ms}`;
    row.append(dot, tag);
    stage.append(row);
    return dot;
  });
  el.append(stage);

  let anims: JSAnimation[] = [];
  const run = (): void => {
    anims.forEach((a) => a.revert());
    anims = DURATIONS.map((ms, i) => animate(dots[i] as HTMLElement, { x: '10rem', duration: ms }));
  };
  run();

  let timer = 0;
  const cleanups: (() => void)[] = [];
  if (preview) {
    timer = window.setInterval(run, 3200);
  } else {
    const readout = document.createElement('pre');
    readout.className = 'readout';
    const show = (): void => {
      readout.textContent = anims.map((a, i) => `duration ${DURATIONS[i]}: ${a.duration} ms, completed: ${a.completed}`).join('\n');
    };
    show();
    timer = window.setInterval(show, 80);
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Run again';
    btn.addEventListener('click', run);
    cleanups.push(() => btn.removeEventListener('click', run));
    el.append(readout, btn);
  }

  return () => {
    window.clearInterval(timer);
    cleanups.forEach((fn) => fn());
    anims.forEach((a) => a.revert());
  };
};

export default mount;
