// Duration-based keyframes with and without a playbackEase applied across all of them
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const choices = ['inOut(3)', 'inOut', 'in(3)', 'out(3)'];

const mount: Mount = (el, { preview }) => {
  const makeLane = (name: string): { lane: HTMLElement; square: HTMLElement; bar: HTMLElement } => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = name;
    const track = document.createElement('div');
    track.className = 'track';
    const square = document.createElement('div');
    square.className = 'square';
    track.append(square);
    const bar = document.createElement('div');
    bar.className = 'bar';
    lane.append(label, track, bar);
    return { lane, square, bar };
  };

  const lanes = document.createElement('div');
  lanes.className = 'lanes';
  const plain = makeLane('no playbackEase');
  const eased = makeLane(`playbackEase: '${choices[0]}'`);
  lanes.append(plain.lane, eased.lane);
  el.append(lanes);

  const run = (square: HTMLElement, bar: HTMLElement, playbackEase?: string): JSAnimation =>
    animate(square, {
      keyframes: [
        { y: '-1rem', duration: 400 },
        { x: '10rem', rotate: 180, scale: 0.6 },
        { y: '1rem' },
        { x: 0, rotate: 360, scale: 1 },
        { y: 0, duration: 400 },
      ],
      duration: 4000,
      ...(playbackEase ? { playbackEase } : {}),
      loop: true,
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.iterationProgress})`;
      },
    });

  let a = run(plain.square, plain.bar);
  let b = run(eased.square, eased.bar, choices[0]);

  const cleanups: (() => void)[] = [];
  if (!preview) {
    const picker = document.createElement('div');
    picker.className = 'picker';
    for (const choice of choices) {
      const btn = document.createElement('button');
      btn.className = choice === choices[0] ? 'btn btn-primary' : 'btn';
      btn.textContent = choice;
      const onClick = (): void => {
        b.revert();
        b = run(eased.square, eased.bar, choice);
        (eased.lane.firstElementChild as HTMLElement).textContent = `playbackEase: '${choice}'`;
        picker.querySelectorAll('button').forEach((x) => (x.className = x === btn ? 'btn btn-primary' : 'btn'));
      };
      btn.addEventListener('click', onClick);
      cleanups.push(() => btn.removeEventListener('click', onClick));
      picker.append(btn);
    }
    el.append(picker);
  }

  return () => {
    cleanups.forEach((fn) => fn());
    a.revert();
    b.revert();
  };
};

export default mount;
