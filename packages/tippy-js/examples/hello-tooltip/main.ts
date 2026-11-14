// Hello tooltip: one tippy() call gives a button a hover and focus tooltip
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 220, hint: 'Hover the button, or Tab to it with the keyboard.' });

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'My Button';
  stage.root.append(button);

  // The whole library in one call: an element and the text for its tooltip.
  stage.own(
    tippy(button, {
      content: "I'm a Tippy tooltip!",
      appendTo: stage.root,
    }),
  );

  // A card has no mouse: a drawn pointer hovers the button and moves away again.
  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(button, 700);
      await wait(1600);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 40, y: 170 }, 700);
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
