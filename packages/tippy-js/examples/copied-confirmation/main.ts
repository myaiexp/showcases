// A share link with a Copy button that confirms with a tip shown for one second
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const LINK = 'https://example.com/share/k3x9f2';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 200, hint: 'Press Copy. The link goes to your clipboard.' });

  const row = document.createElement('div');
  row.className = 'link-row';
  const input = document.createElement('input');
  input.readOnly = true;
  input.value = LINK;
  const copy = document.createElement('button');
  copy.className = 'btn btn-primary';
  copy.textContent = 'Copy';
  row.append(input, copy);
  stage.root.append(row);

  const tip = stage.own(
    tippy(copy, {
      content: 'Copied!',
      // Only our code opens this tip: hovering the button does nothing.
      trigger: 'manual',
      theme: 'copied',
      placement: 'top',
      appendTo: stage.root,
    }),
  );

  let timer = 0;
  stage.onDispose(() => clearTimeout(timer));
  copy.addEventListener('click', () => {
    // A card never touches the real clipboard.
    if (!stage.preview) void navigator.clipboard?.writeText(LINK).catch(() => undefined);
    tip.show();
    clearTimeout(timer);
    timer = window.setTimeout(() => tip.hide(), 1000);
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      await wait(500);
      await stage.ghost.click(copy, 700);
      await wait(2000);
      await stage.ghost.moveTo({ x: 40, y: 150 }, 600);
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;
