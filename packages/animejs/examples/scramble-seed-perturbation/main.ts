// Three scrambles in parallel: one unseeded, two sharing a seed, with perturbation control
import { animate, scrambleText } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, controlRow, slider } from './ui.ts';
import './style.css';

const LINES = [
  { seed: 0, label: 'seed 0 ' },
  { seed: 42, label: 'seed 42' },
  { seed: 42, label: 'seed 42' },
];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const lines = LINES.map(({ label }) => {
    const p = document.createElement('p');
    p.className = 'text';
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = label;
    const body = document.createElement('span');
    body.textContent = 'same seed, same glyphs';
    p.append(tag, body);
    stage.append(p);
    return body;
  });
  el.append(stage);

  let perturbation = 0;
  let anims: Array<ReturnType<typeof animate>> = [];
  const play = (): void => {
    anims.forEach((a) => a.revert());
    // Slow rates make each character's scramble easy to follow by eye.
    anims = lines.map((body, i) =>
      animate(body, {
        innerHTML: scrambleText({
          seed: LINES[i]!.seed,
          perturbation,
          revealRate: 4,
          settleRate: 4,
          cursor: '_',
        }),
      }),
    );
  };

  let timer = 0;
  if (preview) {
    let n = 0;
    play();
    timer = window.setInterval(() => {
      n += 1;
      perturbation = [0, 0.5, 1][n % 3]!;
      play();
    }, 6500);
  } else {
    const controls = controlRow(el);
    slider(controls, 'perturbation', { min: 0, max: 1, step: 0.05, value: 0 }, (v) => (perturbation = v));
    button(controls, 'Replay', play);
    play();
  }

  return () => {
    window.clearInterval(timer);
    anims.forEach((a) => a.revert());
    el.replaceChildren();
  };
};

export default mount;
