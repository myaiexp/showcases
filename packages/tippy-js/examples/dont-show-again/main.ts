// A dismissible tip: its link calls destroy(), and Reset makes a fresh one
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Hover Export, then follow the link in the tip.' });

  const row = document.createElement('div');
  row.className = 'row';
  const exportBtn = document.createElement('button');
  exportBtn.className = 'btn btn-primary';
  const reset = document.createElement('button');
  reset.className = 'btn';
  reset.textContent = 'Reset';
  row.append(exportBtn, reset);
  const status = document.createElement('div');
  stage.root.append(row, status);

  let exports = 0;
  const draw = (): void => {
    exportBtn.textContent = `Export (${exports})`;
    status.textContent = tip ? 'The tip is active.' : 'The tip is gone; the button still works.';
  };
  exportBtn.addEventListener('click', () => {
    exports += 1;
    draw();
  });

  let tip: Instance | null = null;
  const create = (): Instance => {
    const help = document.createElement('div');
    help.className = 'help';
    const text = document.createElement('span');
    text.textContent = 'Tip: export the whole page at once.';
    const dismiss = document.createElement('a');
    dismiss.href = '#';
    dismiss.textContent = "Don't show this again";
    help.append(text, dismiss);
    const instance = tippy(exportBtn, {
      content: help,
      interactive: true,
      delay: [150, 200],
      placement: 'bottom-start',
      maxWidth: 190,
      appendTo: stage.root,
    });
    dismiss.addEventListener('click', (e) => {
      e.preventDefault();
      // Gone for good: the listeners and the popper are removed, and the button is untouched.
      instance.destroy();
      tip = null;
      draw();
    });
    tip = instance;
    draw();
    return instance;
  };
  create();
  stage.own({ destroy: () => tip?.destroy() });
  reset.addEventListener('click', () => {
    if (!tip) create();
  });

  let dismissLink: Element | null = null;
  if (stage.preview) {
    stage.play(async (wait) => {
      exports = 0;
      if (!tip) create();
      draw();
      await stage.ghost.moveTo(exportBtn, 600);
      // Card: open by code. A real hover of an interactive tip would follow the page's mouse (see stage.ts).
      tip!.show();
      await wait(900);
      dismissLink = tip!.popper.querySelector('a');
      await stage.ghost.click(dismissLink!, 700);
      await wait(700);
      await stage.ghost.click(exportBtn, 600);
      await wait(500);
      await stage.ghost.click(exportBtn, 200);
      await wait(600);
      await stage.ghost.click(reset, 700);
      await wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
