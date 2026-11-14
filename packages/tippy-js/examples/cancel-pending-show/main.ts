// Typing calls clearDelayTimeouts() so waiting toolbar tips never open
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const TOOLS: [string, string][] = [
  ['Bold', 'Make the text bold'],
  ['Italic', 'Slant the text'],
  ['Link', 'Turn text into a link'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    height: 250,
    hint: 'Hover a button and type in the box before its tip opens (about a second).',
  });

  const tools = document.createElement('div');
  tools.className = 'tools';
  const buttons = TOOLS.map(([label, note]) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = label;
    b.dataset.note = note;
    tools.append(b);
    return b;
  });
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Type here…';
  const status = document.createElement('div');
  status.textContent = 'Tips: idle';
  stage.root.append(tools, input, status);

  let cancelling = true;
  let waiting = 0;
  const tips = stage.own(
    tippy(buttons, {
      content: (b) => (b as HTMLElement).dataset.note ?? '',
      delay: [1000, 0],
      placement: 'bottom',
      appendTo: stage.root,
      onTrigger: () => {
        waiting += 1;
        status.textContent = 'Tips: waiting to open…';
      },
      onUntrigger: () => {
        if (waiting > 0 && status.textContent !== 'Tips: shown') {
          waiting = 0;
          status.textContent = 'Tips: idle';
        }
      },
      onShow: () => {
        waiting = 0;
        status.textContent = 'Tips: shown';
      },
    }),
  );

  // Any key or scroll while a tip is still counting down clears the countdown.
  const cancelPending = (): void => {
    if (!cancelling) return;
    for (const tip of tips) tip.clearDelayTimeouts();
    if (waiting > 0) {
      waiting = 0;
      status.textContent = 'Tips: cancelled while you typed';
    }
  };
  // A card's ghost types with input events rather than key presses, so both are listened to.
  input.addEventListener('keydown', cancelPending);
  input.addEventListener('input', cancelPending);
  stage.root.addEventListener('wheel', cancelPending, { passive: true });

  if (stage.bar) checkbox(stage.bar, 'Cancel waiting tips when I type', true, (v) => (cancelling = v));

  if (stage.preview) {
    stage.play(async (wait) => {
      status.textContent = 'Tips: idle';
      input.value = '';
      await stage.ghost.hover(buttons[0]!, 600);
      await wait(250);
      await stage.ghost.type(input, 'Hi', 150);
      await wait(1300);
      stage.ghost.leave();
      await wait(300);
      await stage.ghost.hover(buttons[1]!, 500);
      await wait(1800);
      stage.ghost.leave();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
