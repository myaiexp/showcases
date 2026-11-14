// A chat list where delegate() gives every new message a timestamp tip
import { delegate } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const LINES = [
  'Lunch at noon?',
  'Sure, the usual place.',
  'I will bring the notes.',
  'Running five minutes late.',
  'Table is booked.',
  'See you there.',
  'Did anyone see the invoice?',
  'Sent it this morning.',
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Hover any message, old or brand new.' });

  const list = document.createElement('div');
  list.className = 'chat';
  const count = document.createElement('div');
  count.className = 'count';
  stage.root.append(list, count);

  const keep = ctx.preview ? 4 : 7;
  let n = 0;
  const addMessage = (): void => {
    const msg = document.createElement('div');
    msg.className = `msg ${n % 2 ? 'mine' : ''}`;
    msg.textContent = LINES[n % LINES.length]!;
    // Plain data: the tip's content function reads it when the message is hovered.
    msg.setAttribute('data-sent', new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    n++;
    list.append(msg);
    // Old messages scroll away: free the tip of a message before it leaves the page.
    while (list.childElementCount > keep) {
      const old = list.firstElementChild as (Element & { _tippy?: { destroy(): void } }) | null;
      old?._tippy?.destroy();
      old?.remove();
    }
    count.textContent = `${n} messages sent`;
  };
  for (let i = 0; i < 3; i++) addMessage();

  // One call, on the list: no tippy() per message.
  stage.own(
    delegate(list, {
      target: '.msg',
      content: (reference) => `Sent at ${reference.getAttribute('data-sent')}`,
      placement: 'top',
      maxWidth: 150,
      appendTo: stage.root,
    }),
  );

  stage.every(1700, addMessage);
  if (stage.bar) button(stage.bar, 'Send a message', addMessage);

  if (stage.preview) {
    stage.play(async (wait) => {
      await wait(900);
      const newest = list.lastElementChild!;
      await stage.ghost.hover(newest, 700);
      await wait(1200);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 240, y: 20 }, 500);
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
