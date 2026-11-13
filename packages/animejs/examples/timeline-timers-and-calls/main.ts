// A timeline mixing an animation, timers and call() functions, each reporting into a readout
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const dot = document.createElement('div');
  dot.className = 'dot';
  const track = document.createElement('div');
  track.className = 'track';
  track.append(dot);

  const readouts = document.createElement('div');
  readouts.className = 'readouts';
  const make = (label: string, initial: string): HTMLElement => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const l = document.createElement('span');
    l.className = 'l';
    l.textContent = label;
    const v = document.createElement('span');
    v.className = 'v';
    v.textContent = initial;
    cell.append(l, v);
    readouts.append(cell);
    return v;
  };
  const $timerA = make('timer A', '0');
  const $timerB = make('timer B', '0');
  const $callA = make('call A', '--');
  const $callB = make('call B', '--');
  el.append(track, readouts);

  const reset = (): void => {
    $callA.textContent = '--';
    $callB.textContent = '--';
  };

  const tl = createTimeline({ loop: true, loopDelay: 500, onLoop: reset })
    // add(timerParameters, position)
    .add({ duration: 1000, onUpdate: (self) => ($timerA.textContent = String(Math.round(self.currentTime))) }, 0)
    .add(dot, { x: '12rem', duration: 2000 }, 0)
    .add({ duration: 800, onUpdate: (self) => ($timerB.textContent = String(Math.round(self.currentTime))) }, 1200)
    // call(callback, position)
    .call(() => ($callA.textContent = 'fired'), 800)
    .call(() => ($callB.textContent = 'fired'), 1500);

  let btn: HTMLButtonElement | undefined;
  const onClick = (): void => {
    reset();
    tl.restart();
  };
  if (!preview) {
    btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Restart';
    btn.addEventListener('click', onClick);
    el.append(btn);
  }

  return () => {
    btn?.removeEventListener('click', onClick);
    tl.revert();
  };
};

export default mount;
