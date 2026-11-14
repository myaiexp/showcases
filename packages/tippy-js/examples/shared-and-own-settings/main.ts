// A photo-editor toolbar: shared click tips, with two buttons that override one setting
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const TOOLS = ['Crop', 'Turn', 'Filters', 'Retouch', 'Save'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Click the tools. Crop and Filters are the odd ones out.' });

  const toolbar = document.createElement('div');
  toolbar.className = 'toolbar';
  const buttons = TOOLS.map((t) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = t;
    toolbar.append(b);
    return b;
  });
  const legend = document.createElement('div');
  legend.className = 'legend';
  legend.textContent = 'Crop: own text · Filters: no arrow';
  stage.root.append(toolbar, legend);

  // Attributes on single elements win over the shared call below.
  buttons[0]!.setAttribute('data-tippy-content', 'Drag the handles to trim the photo.');
  buttons[2]!.setAttribute('data-tippy-arrow', 'false');

  const tips = stage.own(
    tippy(buttons, {
      content: 'This tool is part of the Pro plan.',
      trigger: 'click',
      placement: 'bottom',
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const [i, b] of buttons.entries()) {
        if (i === 1 || i === 4) continue;
        await stage.ghost.click(b, 600);
        await wait(1100);
        // Real clicks elsewhere close a tip; the ghost sends no document events.
        tips[i]!.hide();
        await wait(300);
      }
      await stage.ghost.moveTo({ x: 30, y: 150 }, 500);
    });
  }

  return stage.dispose;
};

export default mount;
