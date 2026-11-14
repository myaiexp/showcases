// A toolbar where dropping a tool outside it sends the tool flying back to its place
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const TOOLS = [
  ['✏️', 'Pencil'],
  ['🖌️', 'Brush'],
  ['🧽', 'Eraser'],
  ['🪣', 'Fill'],
  ['🔍', 'Zoom'],
] as const;

const mount: Mount = (el, { preview, signal }) => {
  const app = document.createElement('div');
  app.className = 'app';
  app.innerHTML = '<ul class="toolbar"></ul><div class="canvas"><p class="msg">Tools can be reordered, never lost</p></div>';
  const bar = app.querySelector<HTMLElement>('.toolbar')!;
  const msg = app.querySelector<HTMLElement>('.msg')!;
  for (const [icon, name] of TOOLS) {
    const tool = document.createElement('li');
    tool.className = 'tool';
    tool.innerHTML = `<span>${icon}</span><small>${name}</small>`;
    bar.append(tool);
  }
  el.append(app);

  let bounces = 0;
  const sortable = Sortable.create(bar, {
    animation: 250, // the flight home is animated with this duration
    revertOnSpill: true, // a drop outside the toolbar puts the tool back where it started
    onSpill(evt) {
      bounces++;
      msg.textContent = `${evt.item.querySelector('small')!.textContent} went back (${bounces} bounce${bounces > 1 ? 's' : ''})`;
    },
    onEnd(evt) {
      if (evt.to === bar && evt.newIndex !== evt.oldIndex) msg.textContent = 'Tools reordered';
    },
  });

  if (preview) {
    // Alternate: a real reorder inside the toolbar, then a drop out on the canvas.
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const tools = [...bar.children].filter((c) => !c.classList.contains('sortable-fallback'));
      if (turn++ % 2) {
        await hand.drag(tools[0]!, { el: tools[3]!, fx: 0.8 }, 0.9);
      } else {
        await hand.drag(tools[2]!, { el: app.querySelector('.canvas')!, fx: 0.7, fy: 0.7 }, 1.1);
      }
      await hand.wait(0.5);
    }, 0.8);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a tool along the toolbar to reorder it. Drop it anywhere outside the toolbar and it flies back to where it came from.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
