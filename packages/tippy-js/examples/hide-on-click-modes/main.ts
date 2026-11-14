// Three click-triggered tips that each close under a different rule
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Open each tip, then click the button, then click elsewhere on the page.' });

  const MODES = [
    { label: 'Any click', note: 'Any click closes me.', hideOnClick: true, trigger: 'click' },
    { label: 'Button only', note: 'Only my button closes me.', hideOnClick: 'toggle', trigger: 'click' },
    { label: 'Hover', note: 'Clicks do not close me.', hideOnClick: false, trigger: 'mouseenter' },
  ] as const;

  const tips: Instance[] = [];
  const buttons: HTMLElement[] = [];
  for (const mode of MODES) {
    const col = document.createElement('div');
    col.className = 'col';
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = mode.label;
    col.append(b);
    stage.root.append(col);
    buttons.push(b);
    tips.push(
      stage.own(
        tippy(b, {
          content: mode.note,
          trigger: mode.trigger,
          hideOnClick: mode.hideOnClick,
          placement: 'top',
          maxWidth: 104,
          appendTo: stage.root,
        }),
      ),
    );
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      const [any, only, hover] = [buttons[0]!, buttons[1]!, buttons[2]!];
      await stage.ghost.click(any, 700);
      await wait(900);
      // A click on empty space: closes this one. (The card has no page clicks, so close it by hand.)
      await stage.ghost.moveTo({ x: 60, y: 160 }, 600);
      tips[0]!.hide();
      await wait(600);
      await stage.ghost.click(only, 700);
      await wait(700);
      await stage.ghost.moveTo({ x: 130, y: 160 }, 600);
      await wait(900); // this one is still open
      await stage.ghost.click(only, 600);
      await wait(600);
      await stage.ghost.hover(hover, 700);
      await stage.ghost.click();
      await wait(1100);
      stage.ghost.leave();
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
