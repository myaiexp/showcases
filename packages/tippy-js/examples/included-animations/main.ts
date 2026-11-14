// The five entrance animations: fade, shift-away, shift-toward, scale, perspective
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/animations/shift-toward.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/perspective.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// 'fade' is built in; the other four need their stylesheet imported.
const ANIMATIONS = ['fade', 'shift-away', 'shift-toward', 'scale', 'perspective'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Hover, leave, hover again: watch how each one arrives.' });

  const row = document.createElement('div');
  row.className = 'row';
  const buttons = ANIMATIONS.map((name) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = name;
    row.append(b);
    return b;
  });
  stage.root.append(row);

  buttons.forEach((button, i) => {
    stage.own(
      tippy(button, {
        content: 'Here I am!',
        animation: ANIMATIONS[i],
        appendTo: stage.root,
      }),
    );
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const button of buttons) {
        await stage.ghost.hover(button, 450);
        await wait(900);
        stage.ghost.leave();
        await wait(450);
      }
    });
  }

  return stage.dispose;
};

export default mount;
