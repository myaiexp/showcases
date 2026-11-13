// Timer callbacks (onBegin, onUpdate, onLoop, onPause, onComplete, then) logged as they fire
import { createTimer, type Timer } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, h, readout } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const stage = h('div', 'stage', '', el);
  const readouts = h('div', 'readouts', '', stage);
  const $began = readout(readouts, 'onBegin', 'false');
  const $updates = readout(readouts, 'onUpdate');
  const $loops = readout(readouts, 'onLoop');
  const $paused = readout(readouts, 'onPause');
  const $done = readout(readouts, 'onComplete', 'false');
  const $then = readout(readouts, 'then()', 'pending');
  const log = h('pre', 'log', '', stage);

  const lines: string[] = [];
  const note = (text: string): void => {
    lines.push(text);
    if (lines.length > (preview ? 3 : 6)) lines.shift();
    log.textContent = lines.join('\n');
  };

  let timer: Timer | undefined;
  let cycle = 0;
  let updates = 0;
  let loops = 0;
  let paused = 0;
  let timeout = 0;

  const start = (): void => {
    timer?.revert();
    window.clearTimeout(timeout);
    const run = ++cycle;
    updates = loops = paused = 0;
    lines.length = 0;
    for (const $ of [$updates, $loops, $paused]) $.textContent = '0';
    $began.textContent = 'false';
    $done.textContent = 'false';
    $then.textContent = 'pending';
    log.textContent = '';
    timer = createTimer({
      delay: 600,
      duration: 800,
      loop: 2,
      onBegin: () => {
        $began.textContent = 'true';
        note('onBegin');
      },
      onUpdate: () => ($updates.textContent = String(++updates)),
      onLoop: (self) => {
        $loops.textContent = String(++loops);
        note(`onLoop (iteration ${self.currentIteration})`);
      },
      onPause: () => {
        $paused.textContent = String(++paused);
        note('onPause');
      },
      onComplete: () => {
        $done.textContent = 'true';
        note('onComplete');
      },
    });
    timer.then(() => {
      if (run !== cycle) return;
      $then.textContent = 'fulfilled';
      note('then() resolved');
      if (preview) timeout = window.setTimeout(start, 1500);
    });
  };
  start();

  if (!preview) {
    const controls = h('div', 'controls', '', stage);
    button(controls, 'Pause', () => timer?.pause());
    button(controls, 'Resume', () => timer?.resume());
    button(controls, 'Restart run', start, true);
  }

  return () => {
    cycle++;
    window.clearTimeout(timeout);
    timer?.revert();
  };
};

export default mount;
