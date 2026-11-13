// Loop count, alternate, reversed and loopDelay: four preset lanes, or one lane you configure
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { buildLane, buildControls, type Settings } from './ui.ts';
import './style.css';

const presets: { label: string; settings: Settings }[] = [
  { label: 'loop: 3', settings: { loop: 3, alternate: false, reversed: false, loopDelay: 400 } },
  { label: 'loop: 3, alternate: true', settings: { loop: 3, alternate: true, reversed: false, loopDelay: 400 } },
  { label: 'loop: 3, reversed: true', settings: { loop: 3, alternate: false, reversed: true, loopDelay: 400 } },
  { label: 'loop: true', settings: { loop: true, alternate: false, reversed: false, loopDelay: 400 } },
];

const start = (target: HTMLElement, s: Settings, readout?: HTMLElement): JSAnimation =>
  animate(target, {
    x: '12rem',
    duration: 900,
    ease: 'linear',
    loop: s.loop,
    alternate: s.alternate,
    reversed: s.reversed,
    loopDelay: s.loopDelay,
    onLoop: (self) => {
      if (readout) readout.textContent = `iteration ${self.currentIteration} of ${self.iterationCount}`;
    },
    onComplete: () => {
      if (readout) readout.textContent += ' (complete)';
    },
  });

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const animations: JSAnimation[] = [];
  const lanes = document.createElement('div');
  lanes.className = 'lanes';
  el.append(lanes);

  if (preview) {
    for (const p of presets) {
      const lane = buildLane(p.label);
      lanes.append(lane.root);
      animations.push(start(lane.circle, p.settings));
    }
    return () => animations.forEach((a) => a.revert());
  }

  const lane = buildLane('your settings');
  const readout = document.createElement('pre');
  readout.className = 'readout';
  lanes.append(lane.root, readout);

  const apply = (s: Settings): void => {
    animations.pop()?.revert();
    readout.textContent = 'iteration 0';
    animations.push(start(lane.circle, s, readout));
    lane.label.textContent = `loop: ${s.loop}, alternate: ${s.alternate}, reversed: ${s.reversed}, loopDelay: ${s.loopDelay}`;
  };
  const controls = buildControls(apply);
  el.append(controls.root);
  apply(controls.read());

  return () => {
    controls.dispose();
    animations.forEach((a) => a.revert());
  };
};

export default mount;
