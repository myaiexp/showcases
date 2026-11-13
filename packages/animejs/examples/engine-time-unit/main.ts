// engine.timeUnit switches two timers (duration 1 and duration 1000) between seconds and milliseconds
import { engine, createTimer, utils, type Timer } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const card = (label: string): { root: HTMLElement; value: HTMLElement } => {
    const root = document.createElement('div');
    root.className = 'card';
    const l = document.createElement('span');
    l.className = 'label';
    l.textContent = label;
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = '0';
    root.append(l, value);
    return { root, value };
  };
  const row = document.createElement('div');
  row.className = 'cards';

  if (preview) {
    // Changing engine.timeUnit would re-time every other card, so the preview shows one
    // 1000 ms timer read in both units.
    const ms = card('1000 ms');
    const s = card('same timer, in seconds');
    row.append(ms.root, s.root);
    el.append(row);
    const timer = createTimer({
      duration: 1000,
      loop: true,
      onUpdate: (self) => {
        ms.value.textContent = utils.roundPad(self.iterationCurrentTime, 2);
        s.value.textContent = utils.roundPad(self.iterationCurrentTime / 1000, 2);
      },
    });
    return () => void timer.revert();
  }

  const saved = engine.timeUnit;
  const secs = card('duration: 1');
  const millis = card('duration: 1000');
  row.append(secs.root, millis.root);
  const status = document.createElement('pre');
  status.className = 'status';
  const timers: Timer[] = [
    createTimer({
      duration: 1,
      loop: true,
      onUpdate: (self) => (secs.value.textContent = utils.roundPad(self.iterationCurrentTime, 2)),
    }),
    createTimer({
      duration: 1000,
      loop: true,
      onUpdate: (self) => (millis.value.textContent = utils.roundPad(self.iterationCurrentTime, 2)),
    }),
  ];

  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  const msBtn = document.createElement('button');
  const sBtn = document.createElement('button');
  msBtn.textContent = "engine.timeUnit = 'ms'";
  sBtn.textContent = "engine.timeUnit = 's'";
  const show = (): void => {
    const inSeconds = engine.timeUnit === 's';
    msBtn.disabled = !inSeconds;
    sBtn.disabled = inSeconds;
    msBtn.className = 'btn';
    sBtn.className = 'btn';
    status.textContent = `timeUnit: '${engine.timeUnit}'   defaults.duration: ${engine.defaults.duration}`;
  };
  const setUnit = (unit: 'ms' | 's') => () => {
    engine.timeUnit = unit;
    show();
  };
  const toMs = setUnit('ms');
  const toS = setUnit('s');
  msBtn.addEventListener('click', toMs);
  sBtn.addEventListener('click', toS);
  buttons.append(msBtn, sBtn);
  show();
  el.append(row, buttons, status);

  return () => {
    msBtn.removeEventListener('click', toMs);
    sBtn.removeEventListener('click', toS);
    timers.forEach((t) => t.revert());
    engine.timeUnit = saved;
  };
};

export default mount;
