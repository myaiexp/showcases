// Six dots enter a looping timeline with different time position types, with a playhead
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { buildLanes } from './lanes.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const { lanes, playhead } = buildLanes(el);

  const tl = createTimeline({
    defaults: { duration: 600, ease: 'inOutQuad' },
    loop: true,
    loopDelay: 500,
    onUpdate: (self) => {
      // Slide the playhead across the track as the timeline plays.
      playhead.style.setProperty('--t', String(self.iterationCurrentTime / self.iterationDuration));
    },
  });
  // Each dot is added with a different position type; the first one anchors the others.
  for (const { position, dot } of lanes) {
    tl.add(dot, { x: '9rem' }, position);
  }

  const cleanups: Array<() => void> = [];
  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'Hover a row label for the position type description.';
    const mk = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      bar.append(b);
      cleanups.push(() => b.removeEventListener('click', fn));
    };
    mk('Restart', () => tl.restart());
    mk('Pause / resume', () => (tl.paused ? tl.resume() : tl.pause()));
    el.append(bar, note);
  }

  return () => {
    cleanups.forEach((fn) => fn());
    tl.revert();
  };
};

export default mount;
