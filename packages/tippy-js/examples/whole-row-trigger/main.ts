// triggerTarget: the row listens for hover and focus, the warning icon is where the tip points
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const ROWS = [
  { title: 'Payment failed', time: '2m', tip: 'The card on file expired in October.' },
  { title: 'Backup finished', time: '1h', tip: 'Two files were skipped: too large.' },
  { title: 'New sign-in', time: '3h', tip: 'Chrome on Linux, from Helsinki.' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover anywhere on a row, or Tab to it.' });

  const list = document.createElement('div');
  list.className = 'list';
  const rows = (stage.preview ? ROWS.slice(0, 2) : ROWS).map((r) => {
    const row = document.createElement('div');
    row.className = 'row';
    row.tabIndex = 0;
    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = '!';
    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = r.title;
    const time = document.createElement('span');
    time.className = 'time';
    time.textContent = r.time;
    row.append(icon, title, time);
    list.append(row);
    stage.own(
      tippy(icon, {
        content: r.tip,
        // The tip belongs to the icon (that is where it points) but the row hears the pointer.
        triggerTarget: row,
        placement: 'bottom-start',
        maxWidth: 190,
        appendTo: stage.root,
      }),
    );
    return row;
  });
  stage.root.append(list);

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(rows[0]!, 800);
      await wait(1400);
      stage.ghost.leave();
      await wait(300);
      await stage.ghost.hover(rows[1]!, 700);
      await wait(1400);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 230, y: 170 }, 500);
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
