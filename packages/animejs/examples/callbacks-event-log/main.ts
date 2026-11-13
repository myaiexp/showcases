// Every animation callback wired to a counter or a timestamped event log
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const counted = ['onBeforeUpdate', 'onUpdate', 'onRender'] as const;

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const circleTrack = document.createElement('div');
  circleTrack.className = 'track';
  const circle = document.createElement('div');
  circle.className = 'circle';
  circleTrack.append(circle);

  const counters = document.createElement('div');
  counters.className = 'counters';
  const counterEls: Record<string, HTMLElement> = {};
  for (const name of counted) {
    const box = document.createElement('div');
    box.className = 'counter';
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = name;
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = '0';
    box.append(label, value);
    counters.append(box);
    counterEls[name] = value;
  }

  const log = document.createElement('ol');
  log.className = 'log';
  el.append(circleTrack, counters, log);

  let anim: JSAnimation | undefined;
  let restartTimer = 0;
  let disposed = false;
  let t0 = 0;
  const counts: Record<string, number> = {};
  const bump = (name: string): void => {
    counts[name] = (counts[name] ?? 0) + 1;
    const target = counterEls[name];
    if (target) target.textContent = String(counts[name]);
  };
  const note = (text: string): void => {
    const li = document.createElement('li');
    li.textContent = `${String(Math.round(performance.now() - t0)).padStart(5)} ms  ${text}`;
    log.prepend(li);
    while (log.children.length > (preview ? 5 : 12)) log.lastElementChild?.remove();
  };

  const run = (): void => {
    anim?.revert();
    log.replaceChildren();
    for (const name of counted) {
      counts[name] = 0;
      const target = counterEls[name];
      if (target) target.textContent = '0';
    }
    t0 = performance.now();
    anim = animate(circle, {
      x: preview ? '9rem' : '12rem',
      delay: 600,
      duration: 900,
      loop: 2,
      alternate: true,
      loopDelay: 300,
      onBegin: (self) => note(`onBegin (began: ${self.began})`),
      onBeforeUpdate: () => bump('onBeforeUpdate'),
      onUpdate: () => bump('onUpdate'),
      onRender: () => bump('onRender'),
      onLoop: (self) => note(`onLoop (iteration ${self.currentIteration})`),
      onPause: () => note('onPause'),
      onComplete: (self) => note(`onComplete (completed: ${self.completed})`),
    });
    anim.then(() => {
      note('then() fulfilled');
      if (preview && !disposed) restartTimer = window.setTimeout(run, 1800);
    });
    note('animate() called, delay: 600');
  };
  run();

  const cleanups: (() => void)[] = [];
  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'buttons';
    const add = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      cleanups.push(() => b.removeEventListener('click', fn));
      bar.append(b);
    };
    add('Run again', run);
    add('pause()', () => anim?.pause());
    add('resume()', () => anim?.resume());
    el.append(bar);
  }

  return () => {
    disposed = true;
    window.clearTimeout(restartTimer);
    cleanups.forEach((fn) => fn());
    anim?.revert();
  };
};

export default mount;
