// Four custom ease constructors, each plotted and run by a dot; sliders edit the parameters
import { animate, cubicBezier, irregular, linear, steps } from 'animejs';
import type { EasingFunction } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeSlider, makeTrack } from './parts.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const p = { steps: 5, fromStart: false, x1: 0.7, y1: -0.4, x2: 0.3, y2: 1.4, pieces: 10, randomness: 1 };
  const tracks = document.createElement('div');
  tracks.className = 'tracks';
  el.append(tracks);

  const builders: [string, () => EasingFunction][] = [
    ['steps', () => steps(p.steps, p.fromStart)],
    ['linear', () => linear(0, '1 25%', 0, 1)],
    ['cubicBezier', () => cubicBezier(p.x1, p.y1, p.x2, p.y2)],
    ['irregular', () => irregular(p.pieces, p.randomness)],
  ];
  const rows = builders.map(([name]) => makeTrack(name, tracks));
  let anims: { revert(): unknown }[] = [];

  const run = (): void => {
    anims.forEach((a) => a.revert());
    anims = builders.map(([, make], i) => {
      const ease = make();
      rows[i]!.plot(ease);
      return animate(rows[i]!.dot, { left: ['0%', '100%'], duration: 2000, ease, alternate: true, loop: true, loopDelay: 300 });
    });
  };
  run();

  if (preview) {
    // irregular() draws fresh random points each call: rebuild now and then.
    const timer = window.setInterval(() => {
      p.randomness = p.randomness === 1 ? 2 : 1;
      run();
    }, 4200);
    return () => {
      window.clearInterval(timer);
      anims.forEach((a) => a.revert());
    };
  }

  const ui = document.createElement('div');
  ui.className = 'controls';
  const fs = document.createElement('label');
  const box = Object.assign(document.createElement('input'), { type: 'checkbox' });
  box.addEventListener('change', () => {
    p.fromStart = box.checked;
    run();
  });
  fs.append(box, ' steps fromStart');
  ui.append(
    makeSlider('steps n', 1, 12, 1, p.steps, (v) => ((p.steps = v), run())),
    fs,
    makeSlider('x1', 0, 1, 0.05, p.x1, (v) => ((p.x1 = v), run())),
    makeSlider('y1', -1, 2, 0.05, p.y1, (v) => ((p.y1 = v), run())),
    makeSlider('x2', 0, 1, 0.05, p.x2, (v) => ((p.x2 = v), run())),
    makeSlider('y2', -1, 2, 0.05, p.y2, (v) => ((p.y2 = v), run())),
    makeSlider('irregular steps', 2, 30, 1, p.pieces, (v) => ((p.pieces = v), run())),
    makeSlider('randomness', 0, 3, 0.1, p.randomness, (v) => ((p.randomness = v), run())),
  );
  const redo = document.createElement('button');
  redo.className = 'btn';
  redo.textContent = 'New irregular points';
  redo.addEventListener('click', run);
  ui.append(redo);
  el.append(ui);

  return () => anims.forEach((a) => a.revert());
};

export default mount;
