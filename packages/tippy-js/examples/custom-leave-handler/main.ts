// A manual interactive tip opened by mouseenter, closed by our own call
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 250, hint: 'Hover Share, then move into the menu and pick one.' });

  const share = document.createElement('button');
  share.className = 'btn btn-primary';
  share.textContent = 'Share';
  const said = document.createElement('div');
  said.textContent = 'My listeners: waiting';
  const picked = document.createElement('div');
  picked.className = 'picked';
  stage.root.append(share, said, picked);

  const menu = document.createElement('div');
  menu.className = 'menu';
  const options = ['Copy link', 'Email', 'Message'].map((label) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = label;
    b.addEventListener('click', () => {
      picked.textContent = `Shared: ${label}`;
    });
    menu.append(b);
    return b;
  });

  const tip = stage.own(
    tippy(share, {
      content: menu,
      trigger: 'manual', // Tippy adds no hover listeners of its own
      interactive: true,
      placement: 'bottom-start',
      appendTo: stage.root,
    }),
  );

  // Our own listeners. mouseleave hands the event to Tippy, which closes the tip only
  // once the pointer is outside both the button and the tip.
  share.addEventListener('mouseenter', () => {
    said.textContent = 'My listeners: mouseenter, show()';
    tip.show();
  });
  share.addEventListener('mouseleave', (event) => {
    said.textContent = 'My listeners: mouseleave, hideWithInteractivity()';
    tip.hideWithInteractivity(event);
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      picked.textContent = '';
      await stage.ghost.hover(share, 600);
      await wait(700);
      await stage.ghost.moveTo(options[1]!, 600);
      await wait(300);
      await stage.ghost.click(options[1]!, 100);
      await wait(700);
      // Leaving: move away first so the mouseleave event carries a position outside the tip.
      await stage.ghost.moveTo({ x: 240, y: 175 }, 500);
      stage.ghost.leave();
      await wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
