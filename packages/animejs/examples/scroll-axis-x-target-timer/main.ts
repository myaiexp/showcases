// Horizontal scroll triggering a timer: onScroll with axis 'x' and a target, linked through autoplay
import { createTimer, onScroll } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const section = (text?: string): HTMLElement => {
  const s = document.createElement('div');
  s.className = 'section';
  if (text) s.textContent = text;
  return s;
};

const mount: Mount = (el, { preview }) => {
  // Scroller with three sections laid out horizontally; the timer tile is the target.
  const scroller = document.createElement('div');
  scroller.className = preview ? 'scroller is-preview' : 'scroller';
  const content = document.createElement('div');
  content.className = 'content';
  const tile = document.createElement('div');
  tile.className = 'timer';
  const name = document.createElement('span');
  name.className = 'name';
  name.textContent = 'timer (ms)';
  const value = document.createElement('span');
  value.className = 'value';
  value.textContent = '0';
  tile.append(name, value);
  const middle = section();
  middle.append(tile);
  content.append(section('scroll right'), middle, section());
  scroller.append(content);
  const readout = document.createElement('div');
  readout.className = 'readout';
  readout.textContent = "axis: 'x', target: the timer tile";
  el.append(scroller, readout);

  // The timer plays while its target is inside the container, and pauses when it leaves
  const observer = onScroll({ container: scroller, target: tile, axis: 'x', debug: !preview });
  const timer = createTimer({
    duration: 2000,
    alternate: true,
    loop: true,
    onUpdate: self => {
      value.textContent = String(Math.round(self.iterationCurrentTime));
    },
    autoplay: observer,
  });

  let raf = 0;
  if (preview) {
    const start = performance.now();
    const tick = (now: number): void => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      scroller.scrollLeft = ((1 - Math.cos(((now - start) / 6000) * Math.PI * 2)) / 2) * max;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  return () => {
    cancelAnimationFrame(raf);
    observer.revert();
    timer.revert();
  };
};

export default mount;
