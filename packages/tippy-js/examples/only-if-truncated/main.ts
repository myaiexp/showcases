// File names cut off by CSS get a full-name tip; names that fit never show one
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FILES = [
  'notes.txt',
  'Quarterly-report-final-v3-REVIEWED.pdf',
  'logo.png',
  'holiday-photos-2024-lisbon-day-two.zip',
  'todo.md',
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover a name. Only the ones ending in "…" get a tip.' });

  const list = document.createElement('ul');
  list.className = 'files';
  const names = (stage.preview ? FILES.slice(0, 4) : FILES).map((file) => {
    const row = document.createElement('li');
    const icon = document.createElement('span');
    icon.textContent = '▤';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = file;
    row.append(icon, name);
    list.append(row);
    return name;
  });
  stage.root.append(list);

  stage.own(
    tippy(names, {
      content: (name) => name.textContent ?? '',
      placement: 'bottom-start',
      delay: [150, 0],
      maxWidth: 200,
      appendTo: stage.root,
      // Returning false from onShow cancels the show. Show only when the text is wider than its box.
      onShow(instance) {
        const name = instance.reference;
        return name.scrollWidth > name.clientWidth ? undefined : false;
      },
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(names[0]!, 600);
      await wait(900);
      await stage.ghost.hover(names[1]!, 500);
      await wait(1500);
      await stage.ghost.hover(names[2]!, 500);
      await wait(900);
      stage.ghost.leave();
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
