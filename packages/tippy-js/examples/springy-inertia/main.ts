// A springy pop: scale animation with inertia on, off, and with a bouncier curve
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const OPTIONS = [
  { label: 'Plain', tip: 'No spring', inertia: false, theme: '' },
  { label: 'Springy', tip: 'A little overshoot', inertia: true, theme: '' },
  { label: 'Extra bouncy', tip: 'Boing!', inertia: true, theme: 'bouncy' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Hover each button, leave, and hover again.' });

  const row = document.createElement('div');
  row.className = 'row';
  const buttons = OPTIONS.map((o) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = o.label;
    row.append(b);
    return b;
  });
  stage.root.append(row);

  buttons.forEach((button, i) => {
    const o = OPTIONS[i]!;
    stage.own(
      tippy(button, {
        content: o.tip,
        animation: 'scale',
        inertia: o.inertia,
        duration: [450, 175],
        theme: o.theme,
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
        await wait(450);
      }
    });
  }

  return stage.dispose;
};

export default mount;
