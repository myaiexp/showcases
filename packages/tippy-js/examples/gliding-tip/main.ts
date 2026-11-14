// A checkout stepper with one "You are here" tip that glides between the steps
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const STEPS = ['Cart', 'Address', 'Pay', 'Done'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 200, hint: 'Click a step, or use the buttons.' });

  const row = document.createElement('div');
  row.className = 'steps';
  const dots = STEPS.map((label, i) => {
    const step = document.createElement('button');
    step.type = 'button';
    step.className = 'step';
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.textContent = String(i + 1);
    const text = document.createElement('span');
    text.textContent = label;
    step.append(dot, text);
    step.addEventListener('click', () => go(i));
    row.append(step);
    return step;
  });
  stage.root.append(row);

  let current = 0;
  const tip = stage.own(
    tippy(row, {
      content: 'You are here',
      trigger: 'manual',
      showOnCreate: true,
      hideOnClick: false,
      placement: 'bottom',
      // The tip is anchored to the current step's dot, and glides when that changes.
      getReferenceClientRect: () => dots[current]!.getBoundingClientRect(),
      moveTransition: 'transform 0.4s ease-out',
      appendTo: stage.root,
    }),
  );

  function go(i: number): void {
    current = (i + STEPS.length) % STEPS.length;
    dots.forEach((d, n) => d.classList.toggle('done', n < current));
    dots.forEach((d, n) => d.classList.toggle('now', n === current));
    // Re-setting the prop makes Tippy re-read the rectangle.
    tip.setProps({ getReferenceClientRect: () => dots[current]!.getBoundingClientRect() });
  }
  go(0);

  if (stage.bar) {
    button(stage.bar, 'Back', () => go(Math.max(0, current - 1)));
    button(stage.bar, 'Next', () => go(Math.min(STEPS.length - 1, current + 1)));
  } else {
    stage.every(1500, () => go(current + 1));
  }

  return stage.dispose;
};

export default mount;
