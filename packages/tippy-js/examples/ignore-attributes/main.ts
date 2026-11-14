// The same buttons twice: one row reads their data-tippy-* attributes, the other ignores them
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const BUTTONS: [string, Record<string, string>][] = [
  ['Save', { content: 'Save a draft', placement: 'bottom' }],
  ['Share', { content: 'Share a link', placement: 'top', delay: '[600, 0]' }],
  ['Delete', { content: 'Delete for good', placement: 'right', theme: 'danger' }],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover the buttons in both rows and compare.' });
  const rows: HTMLElement[][] = [];

  for (const ignore of [false, true]) {
    const section = document.createElement('div');
    section.className = 'section';
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = ignore ? 'Ignores the HTML settings' : 'Reads the HTML settings';
    const row = document.createElement('div');
    row.className = 'row';
    const made = BUTTONS.map(([label, attrs]) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      for (const [key, value] of Object.entries(attrs)) b.setAttribute(`data-tippy-${key}`, value);
      row.append(b);
      return b;
    });
    rows.push(made);
    section.append(caption, row);
    stage.root.append(section);

    stage.own(
      tippy(made, {
        content: 'One tip for every button',
        placement: 'bottom',
        // false (the default): data-tippy-* attributes win. true: only this call counts.
        ignoreAttributes: ignore,
        appendTo: stage.root,
      }),
    );
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const [r, i] of [[0, 0], [0, 2], [1, 0], [1, 2]] as const) {
        await stage.ghost.hover(rows[r]![i]!, 600);
        await wait(1000);
      }
      stage.ghost.leave();
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;
