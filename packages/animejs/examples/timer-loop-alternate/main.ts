// Timer playing with loop, loopDelay and alternate, read out live
import { createTimer, type Timer } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h, readout, slider } from './dom.ts';
import './style.css';

const DURATION = 1000;

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const track = h('div', 'track', '', stage);
  const dot = h('div', 'dot', '', track);
  const readouts = h('div', 'readouts', '', stage);
  const $time = readout(readouts, 'iteration time');
  const $loops = readout(readouts, 'loops');

  const settings = { alternate: true, loopDelay: preview ? 400 : 750 };
  let timer: Timer | undefined;
  let loops = 0;

  const start = (): void => {
    timer?.revert();
    loops = 0;
    $loops.textContent = '0';
    timer = createTimer({
      loop: true,
      duration: DURATION,
      alternate: settings.alternate,
      loopDelay: settings.loopDelay,
      onLoop: () => ($loops.textContent = String(++loops)),
      onUpdate: (self) => {
        const t = Math.min(DURATION, Math.max(0, self.iterationCurrentTime));
        $time.textContent = String(Math.round(t));
        dot.style.left = `${(t / DURATION) * 100}%`;
      },
    });
  };
  start();

  if (!preview) {
    const controls = h('div', 'controls', '', stage);
    const toggle = button(controls, 'alternate: on', () => {
      settings.alternate = !settings.alternate;
      toggle.textContent = `alternate: ${settings.alternate ? 'on' : 'off'}`;
      start();
    });
    const delayLabel = h('span', 'label', `loopDelay ${settings.loopDelay} ms`, controls);
    slider(controls, 'loopDelay', 0, 2000, settings.loopDelay, 50, (v) => {
      settings.loopDelay = v;
      delayLabel.textContent = `loopDelay ${v} ms`;
      start();
    });
  }

  return () => timer?.revert();
};

export default mount;
