// Read receipts: inView marks messages read as they are seen; the function it returns stops all detection
import { animate, delay, inView, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const TEXT = ['Are we still on for lunch?', 'I booked the table for 12:30', 'The place with the patio', 'Can you bring the printouts?', 'Also the blue folder', 'Running ten minutes late', 'Found parking, walking over', 'Order me the soup please', 'Did you get my last message?', 'Ok see you in a sec'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = '<div class="head"><span>Lunch crew</span><span class="badge"></span></div><div class="chat"></div>';
  el.querySelectorAll('.head, .chat').forEach((n) => n.classList.toggle('full', !preview));
  const msgFull = !preview;
  const chat = el.querySelector<HTMLElement>('.chat')!;
  const badge = el.querySelector<HTMLElement>('.badge')!;
  for (const text of TEXT) {
    const m = document.createElement('div');
    m.className = msgFull ? 'msg full' : 'msg';
    m.innerHTML = '<span class="t"></span><span class="tick">&#10003;&#10003;</span>';
    m.querySelector('.t')!.textContent = text;
    chat.append(m);
  }
  let stop: VoidFunction = () => {};
  let watching = false;
  let p: ReturnType<typeof panel> | undefined;
  let toggleButton: HTMLButtonElement | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    const unread = (): number => chat.querySelectorAll('.msg:not(.read)').length;
    const refresh = (): void => {
      const n = unread();
      badge.textContent = String(n);
      badge.classList.toggle('zero', n === 0);
      if (toggleButton) toggleButton.textContent = watching ? 'Stop read receipts' : 'Resume read receipts';
    };
    const start = bind((): void => {
      stop();
      watching = true;
      // Only messages not yet read are watched, so resuming picks up where it stopped.
      stop = inView(chat.querySelectorAll('.msg:not(.read)'), bind((msg: Element) => {
        msg.classList.add('read');
        animate(msg, { scale: [1, 1.06, 1] }, { duration: 0.35 });
        if (unread() === 0) { stop(); watching = false; } // everything is read: nothing left to watch
        refresh();
      }), { root: chat, amount: 0.9 });
      refresh();
    });
    const halt = (): void => { stop(); watching = false; refresh(); };
    const reset = bind((): void => { chat.querySelectorAll('.msg').forEach((m) => m.classList.remove('read')); chat.scrollTop = 0; start(); });

    start();
    if (preview) {
      autoScroll(chat, { duration: 4 });
      const loop = (): void => { reset(); delay(loop, 9); };
      delay(loop, 9);
    } else {
      hint(el, 'Scroll down to read. Stop receipts partway: later messages stay unread however you scroll, until you resume.');
      p = panel(el);
      toggleButton = p.button('Stop read receipts', () => (watching ? halt() : start()));
      p.button('Reset', reset);
      refresh();
    }
  });
  return () => { scope.cancel(); stop(); p?.dispose(); };
};

export default mount;
