// Every lifecycle hook writes a line to a timeline as the tip opens and closes
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { log } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 340, hint: 'Hover the button, rest a moment, then move away.' });

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Hover me';
  const panel = document.createElement('div');
  panel.className = 'timeline';
  stage.root.append(button, panel);
  const timeline = log(panel, stage.preview ? 6 : 10);
  timeline.el.style.fontSize = '11px';
  timeline.el.style.overflow = 'hidden';

  // Each hook is just a function Tippy calls at that moment; here they only write a line.
  stage.own(
    tippy(button, {
      content: 'Hello!',
      placement: 'right',
      delay: [250, 150],
      appendTo: stage.root,
      onTrigger: (_, event) => timeline.add(`onTrigger  (${event.type})`),
      onShow: () => timeline.add('onShow'),
      onMount: () => timeline.add('onMount'),
      onShown: () => timeline.add('onShown'),
      onUntrigger: (_, event) => timeline.add(`onUntrigger (${event.type})`),
      onHide: () => timeline.add('onHide'),
      onHidden: () => timeline.add('onHidden'),
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      timeline.clear();
      await stage.ghost.hover(button, 700);
      await wait(1700);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 200, y: 60 }, 500);
      await wait(1800);
    });
  }

  return stage.dispose;
};

export default mount;
