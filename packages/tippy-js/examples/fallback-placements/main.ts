// Two side panels: tips prefer the right, then fall back to the bottom, then the left
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const PANELS: { side: 'left' | 'right'; title: string; items: [string, string][] }[] = [
  {
    side: 'left',
    title: 'Folders',
    items: [['Inbox', '12 unread messages'], ['Drafts', '3 unsent drafts'], ['Sent', 'Last sent 2 min ago'], ['Trash', 'Emptied every 30 days']],
  },
  {
    side: 'right',
    title: 'Tools',
    items: [['Search', 'Find any message'], ['Filters', 'Hide what you skip'], ['Rules', 'Sort mail automatically'], ['Export', 'Download as a zip file']],
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Hover the items in both panels, especially the lowest on the right.' });
  const buttons: HTMLElement[] = [];

  for (const panel of PANELS) {
    const aside = document.createElement('div');
    aside.className = `panel ${panel.side}`;
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = panel.title;
    aside.append(title);
    for (const [label, tipText] of panel.items) {
      const item = document.createElement('button');
      item.className = 'btn item';
      item.textContent = label;
      aside.append(item);
      buttons.push(item);
      stage.own(
        tippy(item, {
          content: tipText,
          placement: 'right',
          appendTo: stage.root,
          // Plan A is the right. If it doesn't fit, try the bottom, then the left.
          popperOptions: {
            modifiers: [
              { name: 'flip', options: { fallbackPlacements: ['bottom', 'left'] } },
              { name: 'preventOverflow', options: { altAxis: true, tether: false } },
            ],
          },
        }),
      );
    }
    stage.root.append(aside);
  }

  if (stage.preview) {
    // Card: one item from each situation in turn.
    const order = [buttons[1]!, buttons[4]!, buttons[7]!];
    stage.play(async (wait) => {
      for (const b of order) {
        await stage.ghost.hover(b, 650);
        await wait(1300);
      }
      stage.ghost.leave();
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;
