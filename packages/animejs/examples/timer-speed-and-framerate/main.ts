// Timer playbackRate and frameRate adjusted live through timer.speed and timer.fps
import { createTimer } from 'animejs';
import type { Mount } from '@/types.ts';
import { h, readout, slider } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const track = h('div', 'track', '', stage);
  const dot = h('div', 'dot', '', track);
  const readouts = h('div', 'readouts', '', stage);
  const $speed = readout(readouts, 'speed', '2.0');
  const $fps = readout(readouts, 'fps', '10');
  const $updates = readout(readouts, 'updates / s');

  let frames = 0;
  const timer = createTimer({
    duration: 2000,
    loop: true,
    alternate: true,
    playbackRate: 2,
    frameRate: 10,
    onUpdate: (self) => {
      frames++;
      dot.style.left = `${self.iterationProgress * 100}%`;
    },
  });

  // Count how many times onUpdate really ran each second.
  const meter = window.setInterval(() => {
    $updates.textContent = String(frames);
    frames = 0;
  }, 1000);

  const setSpeed = (v: number): void => {
    timer.speed = v;
    $speed.textContent = v.toFixed(1);
  };
  const setFps = (v: number): void => {
    timer.fps = v;
    $fps.textContent = String(v);
  };

  if (!preview) {
    const controls = h('div', 'controls', '', stage);
    slider(controls, 'playbackRate', 0, 10, 2, 0.1, setSpeed);
    slider(controls, 'frameRate', 1, 120, 10, 1, setFps);
  }

  return () => {
    window.clearInterval(meter);
    timer.revert();
  };
};

export default mount;
