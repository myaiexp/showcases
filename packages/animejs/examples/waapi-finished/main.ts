// WAAPI finished: animation.then() returns a Promise that resolves once the animation completes
import { waapi } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const lane = document.createElement('div');
  lane.className = 'lane wide';
  const track = document.createElement('div');
  track.className = 'track';
  const circle = document.createElement('div');
  circle.className = 'circle';
  track.append(circle);
  lane.append(track);
  el.append(lane);

  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);

  let animation: ReturnType<typeof waapi.animate> | undefined;
  let alive = true;
  let run = 0;
  const play = (): void => {
    animation?.revert();
    const id = ++run;
    readout.textContent = 'promise status: pending';
    readout.dataset.status = 'pending';
    animation = waapi.animate(circle, {
      translate: preview ? '9rem' : '20rem',
      loop: 2,
      alternate: true,
      duration: preview ? 400 : 600,
    });
    // then() takes a callback, as Promise.then() would; ignore results of a replaced run.
    animation.then(() => {
      if (!alive || id !== run) return;
      readout.textContent = 'promise status: fulfilled';
      readout.dataset.status = 'fulfilled';
    });
  };
  play();

  let timer = 0;
  if (preview) {
    timer = window.setInterval(play, 3600);
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Replay';
    btn.addEventListener('click', play);
    bar.append(btn);
    el.append(bar);
  }

  return () => {
    alive = false;
    window.clearInterval(timer);
    animation?.revert();
  };
};

export default mount;
