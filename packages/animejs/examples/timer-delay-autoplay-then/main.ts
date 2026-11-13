// Timer with delay and autoplay: false, started by hand, with then() reporting completion
import { createTimer, type Timer } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h, readout, slider } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const readouts = h('div', 'readouts', '', stage);
  const $time = readout(readouts, 'currentTime');
  const $began = readout(readouts, 'began', 'false');
  const $status = readout(readouts, 'promise', 'idle');
  const lamp = h('div', 'lamp', '', stage);

  let delay = 1000;
  let timer: Timer | undefined;
  let relaunch = 0;

  const play = (): void => {
    timer?.revert();
    window.clearTimeout(relaunch);
    $began.textContent = 'false';
    $status.textContent = 'pending';
    lamp.classList.remove('on');
    const t = createTimer({
      autoplay: false,
      delay,
      duration: 1500,
      onBegin: () => {
        $began.textContent = 'true';
        lamp.classList.add('on');
      },
      onUpdate: (self) => ($time.textContent = String(Math.round(self.currentTime))),
    });
    timer = t;
    t.play();
    t.then(() => {
      if (timer !== t) return;
      $status.textContent = 'fulfilled';
      if (preview) relaunch = window.setTimeout(play, 1200);
    });
  };

  if (preview) {
    play();
  } else {
    const controls = h('div', 'controls', '', stage);
    button(controls, 'Play', play, true);
    slider(controls, 'delay', 0, 3000, delay, 100, (v) => (delay = v));
    $status.textContent = 'press Play';
  }

  return () => {
    window.clearTimeout(relaunch);
    timer?.revert();
  };
};

export default mount;
