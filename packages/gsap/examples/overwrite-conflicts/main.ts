// The same two conflicting tweens in three lanes, with overwrite set to false, true and "auto"
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const MODES: Array<{ mode: boolean | 'auto'; note: string }> = [
  { mode: false, note: 'both tweens keep running and fight over x' },
  { mode: true, note: 'tween 1 is killed outright, rotation stops too' },
  { mode: 'auto', note: 'only the conflicting x is cut, rotation carries on' },
];

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const T = preview ? 150 : 300;
  const lanes = MODES.map(({ mode, note }) => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const label = document.createElement('code');
    label.textContent = `overwrite: ${JSON.stringify(mode)}`;
    const track = document.createElement('div');
    track.className = 'track';
    const box = document.createElement('div');
    box.className = 'box';
    track.append(box);
    const text = document.createElement('span');
    text.className = 'note';
    text.textContent = note;
    lane.append(label, track, text);
    root.append(lane);
    return { mode, box };
  });
  el.append(root);

  const boxes = lanes.map((l) => l.box);
  const timers: number[] = [];
  const clearTimers = (): void => {
    for (const t of timers.splice(0)) window.clearTimeout(t);
  };

  const fire = (): void => {
    clearTimers();
    gsap.killTweensOf(boxes);
    gsap.set(boxes, { x: 0, rotation: 0 });
    // Tween 1 moves x and rotates; tween 2, 0.8s later, only wants x somewhere else.
    gsap.to(boxes, { x: T, rotation: 360, duration: 2.4, ease: 'none' });
    timers.push(
      window.setTimeout(() => {
        for (const { mode, box } of lanes) {
          gsap.to(box, { x: T * 0.15, duration: 1.2, ease: 'power1.inOut', overwrite: mode });
        }
      }, 800),
    );
  };
  fire();

  let loop = 0;
  if (preview) loop = window.setInterval(fire, 4200);
  else {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Fire both tweens again';
    btn.addEventListener('click', fire);
    root.append(btn);
  }

  return () => {
    window.clearInterval(loop);
    clearTimers();
    gsap.killTweensOf(boxes);
  };
};

export default mount;
