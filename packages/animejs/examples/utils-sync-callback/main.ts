// utils.sync(): change an animation's speed from a callback that runs in step with the engine loop
import { animate, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const track = document.createElement('div');
  track.className = 'track';
  const circle = document.createElement('div');
  circle.className = 'circle';
  track.append(circle);
  const readout = document.createElement('pre');
  readout.className = 'readout';
  el.append(track);
  if (!preview) el.append(readout);

  const animation = animate(circle, {
    x: 220,
    duration: 1600,
    ease: 'inOutQuad',
    loop: true,
    alternate: true,
  });

  let syncs = 0;
  let speed = 1;
  const paint = (): void => {
    readout.textContent = `speed ${utils.roundPad(speed, 2)}\nsync() callbacks run: ${syncs}`;
  };
  const setSpeed = (value: number): void => {
    speed = value;
    // The assignment waits for the next engine tick instead of happening mid-event.
    utils.sync(() => {
      animation.speed = value;
      syncs++;
      paint();
    });
  };
  paint();

  let timer = 0;
  if (preview) {
    const speeds = [0.5, 3, 1, 4];
    let i = 0;
    timer = window.setInterval(() => setSpeed(speeds[i++ % speeds.length] ?? 1), 1500);
  } else {
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '0';
    range.max = '5';
    range.step = '0.01';
    range.value = '1';
    range.addEventListener('input', () => setSpeed(+range.value));
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.append('speed', range);
    el.append(panel);
  }

  return () => {
    window.clearInterval(timer);
    animation.revert();
  };
};

export default mount;
