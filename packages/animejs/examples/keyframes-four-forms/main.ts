// Four keyframe syntaxes driving the same out-and-back motion, one lane each
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const common = { duration: 3000, ease: 'inOutSine', loop: true, alternate: true };

const forms: { label: string; code: string; run: (target: HTMLElement) => JSAnimation }[] = [
  {
    label: 'Tween values',
    code: "x: ['0rem', 10, 10, 0],\nscale: [1, 1, .5, .5]",
    run: (t) => animate(t, { x: ['0rem', 10, 10, 0], scale: [1, 1, 0.5, 0.5], ...common }),
  },
  {
    label: 'Tween parameters',
    code: "x: [{ to: '10rem', duration: 1000 },\n    { to: 0, delay: 1000 }],\nscale: [{ to: .5, delay: 1000 }]",
    run: (t) =>
      animate(t, {
        x: [
          { to: '10rem', duration: 1000 },
          { to: 0, duration: 1000, delay: 1000 },
        ],
        scale: [{ to: 0.5, duration: 1000, delay: 1000 }],
        ...common,
      }),
  },
  {
    label: 'Duration-based',
    code: "keyframes: [\n  { x: '10rem' },\n  { scale: .5 },\n  { x: 0 },\n]",
    run: (t) => animate(t, { keyframes: [{ x: '10rem' }, { scale: 0.5 }, { x: 0 }], ...common }),
  },
  {
    label: 'Percentage-based',
    code: "keyframes: {\n  '0%': { x: '0rem', scale: 1 },\n  '33%': { x: '10rem' },\n  '67%': { scale: .5 },\n  '100%': { x: 0 },\n}",
    run: (t) =>
      animate(t, {
        keyframes: {
          '0%': { x: '0rem', scale: 1 },
          '33%': { x: '10rem' },
          '67%': { scale: 0.5 },
          '100%': { x: 0 },
        },
        ...common,
      }),
  },
];

const mount: Mount = (el, { preview }) => {
  const animations: JSAnimation[] = [];
  const lanes = document.createElement('div');
  lanes.className = 'lanes';
  for (const form of forms) {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = form.label;
    const track = document.createElement('div');
    track.className = 'track';
    const square = document.createElement('div');
    square.className = 'square';
    track.append(square);
    lane.append(label, track);
    if (!preview) {
      const code = document.createElement('pre');
      code.className = 'code';
      code.textContent = form.code;
      lane.append(code);
    }
    lanes.append(lane);
    animations.push(form.run(square));
  }
  el.append(lanes);

  if (!preview) {
    const restart = document.createElement('button');
    restart.className = 'btn';
    restart.textContent = 'Restart all';
    restart.addEventListener('click', () => animations.forEach((a) => a.restart()));
    el.append(restart);
  }

  return () => animations.forEach((a) => a.revert());
};

export default mount;
