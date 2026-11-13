// WAAPI iterations: loop counts repeats on top of the first play, unlike the native total of iterations
import { waapi } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const LANES: { loop: number | boolean; text: string }[] = [
  { loop: 0, text: 'loop: 0  (iterations: 1, no repeat)' },
  { loop: 2, text: 'loop: 2  (iterations: 3, repeats twice)' },
  { loop: 4, text: 'loop: 4  (iterations: 5)' },
  { loop: true, text: 'loop: true  (iterations: Infinity)' },
];

const mount: Mount = (el, { preview }) => {
  const lanes = document.createElement('div');
  lanes.className = preview ? 'lanes is-preview' : 'lanes';
  const squares = LANES.map(({ text }) => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const label = document.createElement('span');
    label.className = 'lane-label';
    label.textContent = text;
    const track = document.createElement('div');
    track.className = 'track';
    const square = document.createElement('div');
    square.className = 'square';
    track.append(square);
    lane.append(label, track);
    lanes.append(lane);
    return square;
  });
  el.append(lanes);

  let animations: ReturnType<typeof waapi.animate>[] = [];
  const play = (): void => {
    animations.forEach((a) => a.revert());
    // Every pass jumps back to the start, so the number of sweeps is the number of plays.
    animations = squares.map((square, i) =>
      waapi.animate(square, {
        translate: preview ? '8rem' : '20rem',
        loop: LANES[i]!.loop,
        duration: 900,
        ease: 'linear',
      }),
    );
  };
  play();

  let timer = 0;
  if (preview) {
    timer = window.setInterval(play, 6000);
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
    window.clearInterval(timer);
    animations.forEach((a) => a.revert());
  };
};

export default mount;
