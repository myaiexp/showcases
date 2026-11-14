// A text-editor toolbar whose buttons share one tip that slides between them
import tippy, { createSingleton } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const TOOLS = [
  { icon: 'B', tip: 'Bold', cls: 'bold' },
  { icon: 'I', tip: 'Italic', cls: 'italic' },
  { icon: 'U', tip: 'Underline', cls: 'under' },
  { icon: '❝', tip: 'Quote', cls: '' },
  { icon: '☰', tip: 'Bullet list', cls: '' },
  { icon: '↗', tip: 'Insert link', cls: '' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Slide the pointer along the toolbar.' });

  const bar = document.createElement('div');
  bar.className = 'toolbar';
  const buttons = TOOLS.map((t) => {
    const b = document.createElement('button');
    b.className = `btn tool ${t.cls}`;
    b.textContent = t.icon;
    bar.append(b);
    return b;
  });
  const page = document.createElement('div');
  page.className = 'page';
  page.textContent = 'Dear team, here is the plan for the week...';
  stage.root.append(bar, page);

  // One ordinary tippy per button (they only carry the text)...
  const instances = buttons.map((b, i) => stage.own(tippy(b, { content: TOOLS[i]!.tip })));
  // ...and one singleton that shows them all with a single, moving box.
  stage.own(
    createSingleton(instances, {
      delay: [250, 150],
      moveTransition: 'transform 0.25s ease-out',
      placement: 'top',
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      // Each hop is shorter than the hide delay, so the same box slides along.
      await stage.ghost.hover(buttons[0]!, 700);
      await wait(900);
      for (const b of buttons.slice(1)) {
        await stage.ghost.hover(b, 220);
        await wait(700);
      }
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 210, y: 150 }, 600);
      await wait(700);
    });
  }

  return stage.dispose;
};

export default mount;
