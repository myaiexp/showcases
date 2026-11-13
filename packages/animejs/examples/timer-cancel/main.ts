// timer.cancel() pauses a timer and removes it from the engine; play() brings it back
import { createTimer } from 'animejs';
import type { Timer } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const bar = document.createElement('div');
  bar.className = 'bar';
  const fill = document.createElement('div');
  fill.className = 'fill';
  bar.append(fill);
  const readout = document.createElement('pre');
  readout.className = 'readout';
  el.append(bar, readout);

  let canceled = false;
  const show = (t: Timer): void => {
    fill.style.transform = `scaleX(${t.progress})`;
    readout.textContent = `currentTime: ${Math.round(t.currentTime)}\npaused: ${t.paused}   canceled by us: ${canceled}`;
  };
  const timer = createTimer({ duration: 4000, loop: true, onUpdate: show });
  const play = (): void => {
    canceled = false;
    timer.play();
    show(timer);
  };
  const cancel = (): void => {
    canceled = true;
    timer.cancel();
    show(timer);
  };

  let cycle = 0;
  const cleanups: (() => void)[] = [];
  if (preview) {
    // Cancel and play on a loop so the card shows the bar freezing and resuming.
    cycle = window.setInterval(() => (canceled ? play() : cancel()), 1500);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const button = (text: string, fn: () => void): void => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = text;
      btn.addEventListener('click', fn);
      cleanups.push(() => btn.removeEventListener('click', fn));
      panel.append(btn);
    };
    button('Play', play);
    button('Cancel', cancel);
    el.append(panel);
  }
  show(timer);

  return () => {
    window.clearInterval(cycle);
    cleanups.forEach((fn) => fn());
    timer.revert();
  };
};

export default mount;
