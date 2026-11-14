// One animation (shift-away) in its subtle, normal and extreme strengths
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/animations/shift-away-subtle.css';
import 'tippy.js/animations/shift-away-extreme.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// The strength is part of the animation's name.
const STRENGTHS = [
  { label: 'Subtle', animation: 'shift-away-subtle' },
  { label: 'Normal', animation: 'shift-away' },
  { label: 'Extreme', animation: 'shift-away-extreme' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Hover each button, leave, and hover again.' });

  const row = document.createElement('div');
  row.className = 'row';
  const buttons = STRENGTHS.map((s) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = s.label;
    row.append(b);
    return b;
  });
  stage.root.append(row);

  buttons.forEach((button, i) => {
    stage.own(
      tippy(button, {
        content: `${STRENGTHS[i]!.label} movement`,
        animation: STRENGTHS[i]!.animation,
        duration: 450,
        appendTo: stage.root,
      }),
    );
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const button of buttons) {
        await stage.ghost.hover(button, 450);
        await wait(1000);
        stage.ghost.leave();
        await wait(550);
      }
    });
  }

  return stage.dispose;
};

export default mount;
