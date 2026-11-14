// onTrigger reads event.type and writes how the tip was opened
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const WAYS: Record<string, string> = {
  mouseenter: 'mouse hover',
  focus: 'keyboard focus',
  click: 'a click',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover it, Tab to it, or click it.' });

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Open me';
  const last = document.createElement('div');
  last.textContent = 'Last opened by: nothing yet';
  stage.root.append(button, last);

  const tip = stage.own(
    tippy(button, {
      content: 'Opened by: nothing yet',
      trigger: 'mouseenter focus click',
      placement: 'top',
      appendTo: stage.root,
      // The event that triggered the tip is handed to onTrigger; its type says how.
      onTrigger(instance, event) {
        const way = WAYS[event.type] ?? event.type;
        instance.setContent(`Opened by ${way}`);
        last.textContent = `Last opened by: ${way}`;
      },
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      last.textContent = 'Last opened by: nothing yet';
      await stage.ghost.hover(button, 700);
      await wait(1200);
      stage.ghost.leave();
      await wait(500);
      stage.ghost.focus(button);
      await wait(1200);
      stage.ghost.blur(button);
      await wait(500);
      await stage.ghost.click(button, 400);
      await wait(1200);
      // A click anywhere else closes a click-opened tip; the ghost sends no mousedown, so hide by hand.
      tip.hide();
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
