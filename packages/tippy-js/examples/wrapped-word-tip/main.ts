// A link that wraps over two lines, with and without inline positioning
import tippy, { inlinePositioning } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover the dotted link in each column.' });

  const links: HTMLElement[] = [];
  for (const inline of [false, true]) {
    const col = document.createElement('div');
    col.className = 'col';
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = inline ? 'Points at the line piece' : 'Points at the middle';
    const p = document.createElement('p');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = 'cancellation policy';
    link.addEventListener('click', (e) => e.preventDefault());
    p.append('Read our ', link, ' first.');
    col.append(caption, p);
    stage.root.append(col);
    links.push(link);

    stage.own(
      tippy(link, {
        content: '30-day refund',
        maxWidth: 120,
        placement: 'bottom',
        // Treats each line of a wrapped link as its own box, and uses the one that suits the side.
        inlinePositioning: inline,
        plugins: [inlinePositioning],
        appendTo: stage.root,
      }),
    );
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const link of links) {
        await stage.ghost.hover(link, 700);
        await wait(1600);
      }
      stage.ghost.leave();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
