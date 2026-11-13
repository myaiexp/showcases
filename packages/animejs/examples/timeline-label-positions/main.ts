// A timeline with three named labels; children are placed at labels and buttons seek to them
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const NAMES = ['circle', 'square', 'triangle'] as const;

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const ruler = document.createElement('div');
  ruler.className = 'ruler';
  const shapes = {} as Record<(typeof NAMES)[number], HTMLElement>;
  for (const name of NAMES) {
    const track = document.createElement('div');
    track.className = 'track';
    const shape = document.createElement('div');
    shape.className = `shape ${name}`;
    track.append(shape);
    stage.append(track);
    shapes[name] = shape;
  }
  stage.append(ruler);
  el.append(stage);

  const tl = createTimeline({ loop: true, loopDelay: 600 })
    .label('circle', 0)
    .label('square', 500)
    .label('triangle', 1000)
    .add(shapes.square, { x: '10rem', duration: 500 }, 'square')
    .add(shapes.circle, { x: '8rem', duration: 1000 }, 'circle')
    .add(shapes.triangle, { x: '9rem', rotate: '1turn', duration: 500 }, 'triangle');

  // Mark each label on a ruler, positioned by its time in the timeline.
  for (const [name, time] of Object.entries(tl.labels)) {
    const tick = document.createElement('span');
    tick.className = 'tick';
    tick.textContent = name;
    tick.style.left = `${(time / tl.iterationDuration) * 100}%`;
    ruler.append(tick);
  }

  const cleanups: Array<() => void> = [];
  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    for (const name of NAMES) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = `Seek to '${name}'`;
      const fn = (): void => {
        tl.pause();
        tl.seek(tl.labels[name] ?? 0);
      };
      b.addEventListener('click', fn);
      bar.append(b);
      cleanups.push(() => b.removeEventListener('click', fn));
    }
    const play = document.createElement('button');
    play.className = 'btn btn-primary';
    play.textContent = 'Play';
    const onPlay = (): void => void tl.play();
    play.addEventListener('click', onPlay);
    cleanups.push(() => play.removeEventListener('click', onPlay));
    bar.append(play);
    el.append(bar);
  }

  return () => {
    cleanups.forEach((fn) => fn());
    tl.revert();
  };
};

export default mount;
