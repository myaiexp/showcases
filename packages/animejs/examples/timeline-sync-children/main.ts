// Standalone animation, timer and sub-timeline are synced into one main timeline
import { animate, createTimeline, createTimer } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const lane = (parent: HTMLElement, name: string): HTMLElement => {
  const row = document.createElement('div');
  row.className = 'lane';
  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = name;
  const track = document.createElement('div');
  track.className = 'track';
  const dot = document.createElement('div');
  dot.className = 'dot';
  track.append(dot);
  row.append(label, track);
  parent.append(row);
  return dot;
};

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const board = document.createElement('div');
  board.className = 'board';
  const dotA = lane(board, 'animate()');
  const dotB = lane(board, 'sub-timeline');
  const dotC = lane(board, 'sub-timeline');
  const timerRow = document.createElement('div');
  timerRow.className = 'timer';
  timerRow.textContent = 'timer 0';
  board.append(timerRow);
  el.append(board);

  // Three independent things, created paused by the timeline's sync() below.
  const animation = animate(dotA, { x: preview ? '6rem' : '9rem', duration: 1200 });
  const timer = createTimer({
    duration: 1500,
    onUpdate: (self) => (timerRow.textContent = `timer ${Math.round(self.currentTime)}`),
  });
  const inner = createTimeline({ defaults: { duration: 800 } })
    .add(dotB, { x: preview ? '6rem' : '9rem' })
    .add(dotC, { x: preview ? '6rem' : '9rem' }, '-=400');

  const main = createTimeline({ loop: true, loopDelay: 600, alternate: true })
    .sync(animation)
    .sync(timer, 0)
    .sync(inner, '-=500');

  let btn: HTMLButtonElement | undefined;
  const onClick = (): void => void main.restart();
  if (!preview) {
    btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Restart';
    btn.addEventListener('click', onClick);
    el.append(btn);
  }

  return () => {
    btn?.removeEventListener('click', onClick);
    main.revert();
    inner.revert();
    timer.revert();
    animation.revert();
  };
};

export default mount;
