// WAAPI direction: the four native direction values expressed as reversed and alternate on waapi.animate()
import { waapi } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

// Each row is one row of the docs' `direction` table.
const LANES = [
  { native: "'forward'", reversed: false, alternate: false },
  { native: "'reverse'", reversed: true, alternate: false },
  { native: "'alternate'", reversed: false, alternate: true },
  { native: "'alternate-reverse'", reversed: true, alternate: true },
];

const mount: Mount = (el, { preview }) => {
  const lanes = document.createElement('div');
  lanes.className = preview ? 'lanes is-preview' : 'lanes';
  const squares = LANES.map(({ native, reversed, alternate }) => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const label = document.createElement('span');
    label.className = 'lane-label';
    label.textContent = `direction: ${native}  =  reversed: ${reversed}, alternate: ${alternate}`;
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
    animations = squares.map((square, i) => {
      const { reversed, alternate } = LANES[i]!;
      return waapi.animate(square, {
        translate: preview ? '8rem' : '20rem',
        reversed,
        alternate,
        // Preview loops forever; the full view plays three loops and stops.
        loop: preview ? true : 3,
        duration: 1500,
      });
    });
  };
  play();

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Replay (loop: 3)';
    btn.addEventListener('click', play);
    bar.append(btn);
    el.append(bar);
  }

  return () => animations.forEach((a) => a.revert());
};

export default mount;
