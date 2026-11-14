// Incoming messages pass User.parse() before the program uses them, or are stopped
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { issueList } from '../../shared/verdict.ts';
import './style.css';

const User = z.object({
  name: z.string(),
});

// What arrives from outside: the program cannot know its shape in advance.
const INCOMING: unknown[] = [{ name: 'Ada' }, { nmae: 'Grace' }, { name: 'Linus' }, { name: 42 }, null, { name: 'Margaret', admin: true }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each message is checked by User.parse() before the program touches it.' });
  const feed = document.createElement('div');
  feed.className = 'feed';
  stage.root.append(feed);

  const receive = (input: unknown): void => {
    const row = document.createElement('div');
    row.className = 'msg';
    const raw = document.createElement('div');
    raw.className = 'raw';
    raw.textContent = JSON.stringify(input);
    const out = document.createElement('div');
    out.className = 'out';
    try {
      // parse() returns the checked data, or throws before the next line runs.
      const data = User.parse(input);
      out.textContent = `👋 Hello, ${data.name}!`;
      row.dataset['ok'] = 'true';
      stage.say(`✓ Passed: the program used data.name safely`, 'ok');
    } catch (error) {
      if (!(error instanceof z.ZodError)) throw error;
      out.append('⛔ Stopped: ', issueList(error.issues, 1));
      row.dataset['ok'] = 'false';
      stage.say(`✗ ZodError thrown: the greeting code never ran`, 'bad');
    }
    row.append(raw, out);
    feed.prepend(row);
    row.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 260 });
    while (feed.children.length > (stage.preview ? 4 : 8)) feed.lastElementChild!.remove();
  };

  let i = 0;
  const next = (): void => receive(INCOMING[i++ % INCOMING.length]);
  next();
  stage.every(stage.preview ? 1500 : 2200, next);
  return stage.dispose;
};

export default mount;
