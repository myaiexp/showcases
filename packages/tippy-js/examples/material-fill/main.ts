// Floating action buttons whose tips fill in like ink, using the animateFill plugin
import tippy, { animateFill } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FABS = [
  { icon: '📷', tip: 'Add a photo' },
  { icon: '🎤', tip: 'Record a voice note' },
  { icon: '✎', tip: 'Write a new note' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Hover the round buttons.' });

  const page = document.createElement('div');
  page.className = 'page';
  const title = document.createElement('div');
  title.className = 'page-title';
  title.textContent = 'My notes';
  page.append(title);
  for (const w of [80, 60, 70]) {
    const line = document.createElement('div');
    line.className = 'line';
    line.style.width = `${w}%`;
    page.append(line);
  }
  const stack = document.createElement('div');
  stack.className = 'stack';
  const buttons = FABS.map((f, i) => {
    const b = document.createElement('button');
    b.className = i === FABS.length - 1 ? 'fab main' : 'fab';
    b.textContent = f.icon;
    stack.append(b);
    return b;
  });
  stage.root.append(page, stack);

  // animateFill needs its plugin passed in as well as backdrop.css imported.
  buttons.forEach((button, i) => {
    stage.own(
      tippy(button, {
        content: FABS[i]!.tip,
        placement: 'left',
        animateFill: true,
        animation: 'shift-away',
        plugins: [animateFill],
        duration: 250,
        appendTo: stage.root,
      }),
    );
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const button of buttons) {
        await stage.ghost.hover(button, 550);
        await wait(1100);
        stage.ghost.leave();
        await wait(350);
      }
    });
  }

  return stage.dispose;
};

export default mount;
