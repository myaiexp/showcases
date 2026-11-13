// Timer methods: play, pause, resume, reverse, alternate, restart, seek, complete, reset, stretch
import { createTimer } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h, readout, slider } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const bar = h('div', 'bar', '', stage);
  const fill = h('div', 'fill', '', bar);
  const readouts = h('div', 'readouts', '', stage);
  const $time = readout(readouts, 'currentTime');
  const $iter = readout(readouts, 'iteration time');
  const $state = readout(readouts, 'state', 'playing');
  const $duration = readout(readouts, 'duration', '2000');

  const timer = createTimer({
    duration: 2000,
    loop: true,
    onUpdate: (self) => {
      $time.textContent = String(Math.round(self.currentTime));
      $iter.textContent = String(Math.round(self.iterationCurrentTime));
      fill.style.width = `${self.iterationProgress * 100}%`;
      $state.textContent = self.paused ? 'paused' : self.backwards ? 'backwards' : 'playing';
    },
  });

  let scripted = 0;
  if (preview) {
    // Script a few methods in turn so the card shows direction changes and seeks.
    const steps = [() => timer.reverse(), () => timer.play(), () => timer.seek(1500), () => timer.alternate()];
    let i = 0;
    scripted = window.setInterval(() => steps[i++ % steps.length]!(), 1400);
  } else {
    const controls = h('div', 'controls', '', stage);
    button(controls, 'play()', () => timer.play());
    button(controls, 'reverse()', () => timer.reverse());
    button(controls, 'pause()', () => timer.pause());
    button(controls, 'resume()', () => timer.resume());
    button(controls, 'alternate()', () => timer.alternate());
    button(controls, 'restart()', () => timer.restart());
    button(controls, 'complete()', () => timer.complete());
    button(controls, 'reset()', () => {
      timer.reset();
      $time.textContent = String(timer.currentTime);
    });
    const range = slider(stage, 'seek(time)', 0, 2000, 0, 10, (v) => timer.seek(v));
    range.addEventListener('pointerdown', () => timer.pause());
    slider(stage, 'stretch(duration)', 500, 6000, 2000, 100, (v) => {
      timer.stretch(v);
      $duration.textContent = String(timer.duration);
      timer.restart();
    });
  }

  return () => {
    window.clearInterval(scripted);
    timer.revert();
  };
};

export default mount;
