// A chat thread pinned to the bottom: inserting a bubble slides the older ones up
import { animate, animateLayout, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const SCRIPT: Array<[boolean, string]> = [
  [false, 'Are we still on for lunch?'], [true, 'Yes! 12:30?'], [false, 'Perfect. Thai place?'],
  [true, 'Booked a table.'], [false, 'You are the best'], [true, 'See you there'],
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="chat"><div class="thread"></div>${preview ? '' : '<form class="send"><input placeholder="Type a message" aria-label="Message"><button class="btn">Send</button></form>'}</div>`;
  const thread = el.querySelector('.thread') as HTMLElement;
  const limit = preview ? 5 : 6;

  const post = (mine: boolean, text: string): void => {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${mine ? 'mine' : 'theirs'}`;
    bubble.setAttribute('data-layout', '');
    bubble.textContent = text;
    // The thread is a bottom-aligned column: adding a bubble pushes the others up.
    animateLayout(el, () => {
      thread.append(bubble);
      while (thread.children.length > limit) thread.firstElementChild?.remove();
    }, { type: 'spring', visualDuration: 0.4, bounce: 0.2 });
    animate(bubble, { opacity: [0, 1] }, { duration: 0.25 });
  };
  let n = 0;
  const nextScripted = (): void => {
    const [mine, text] = SCRIPT[n++ % SCRIPT.length]!;
    post(mine, text);
  };
  // The first bubbles are there from the start, with no animation.
  for (const [mine, text] of SCRIPT.slice(0, 3)) {
    const b = document.createElement('div');
    b.className = `bubble ${mine ? 'mine' : 'theirs'}`;
    b.setAttribute('data-layout', '');
    b.textContent = text;
    thread.append(b);
    n++;
  }

  const scope = scopeMotion(el, () => {
    if (!preview) return;
    const tick = (): void => {
      nextScripted();
      delay(tick, 1.3);
    };
    delay(tick, 1);
  });
  if (preview) return () => scope.cancel();

  const form = el.querySelector('form') as HTMLFormElement;
  const input = form.querySelector('input') as HTMLInputElement;
  const onSubmit = (e: Event): void => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    scope.run(() => {
      post(true, text);
      delay(() => post(false, 'Sounds good!'), 1.2);
    });
  };
  form.addEventListener('submit', onSubmit);
  hint(el, 'Type a message and send it. The new bubble arrives at the bottom and the older ones slide up; a reply follows a moment later.');
  return () => {
    scope.cancel();
    form.removeEventListener('submit', onSubmit);
  };
};

export default mount;
