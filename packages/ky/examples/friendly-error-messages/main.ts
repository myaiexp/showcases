// Type guards turn each kind of failure into a sentence a visitor can act on
import { isHTTPError, isNetworkError, isResponseSizeError, isTimeoutError } from 'ky';
import type { Mount } from '@/types.ts';
import type { Reply } from '../../shared/server.ts';
import { kyName, toast } from '../../shared/err-kit.ts';
import { cycle, demo, notes } from '../../shared/req-kit.ts';

interface Case {
  label: string;
  reply: Reply;
  /** Extra Ky options for the call. */
  options?: { timeout?: number; maxResponseSize?: number };
}

const CASES: readonly Case[] = [
  { label: 'no connection', reply: { drop: true } },
  { label: 'server too slow', reply: { json: {}, delay: 1500 }, options: { timeout: 300 } },
  { label: 'not signed in (401)', reply: { status: 401 } },
  { label: 'no such page (404)', reply: { status: 404 } },
  { label: 'server bug (500)', reply: { status: 500 } },
  { label: 'file too big', reply: { bytes: new Uint8Array(6000), stream: { pieces: 3, every: 80 } }, options: { maxResponseSize: 1000 } },
];

/** One place that knows how to talk to the visitor. */
function friendly(error: unknown): string {
  if (isNetworkError(error)) return 'You seem to be offline. Check your connection and try again.';
  if (isTimeoutError(error)) return 'The server is taking too long. Please try again in a moment.';
  if (isResponseSizeError(error)) return 'That file is too big to open here.';
  if (isHTTPError(error)) {
    const status = error.response.status;
    if (status === 401) return 'Please sign in again.';
    if (status === 404) return 'We could not find that page.';
    if (status >= 500) return 'Our server had a problem. It is not your fault.';
  }
  return 'Something went wrong.';
}

const mount: Mount = (el, ctx) => {
  let current = CASES[0]!;
  const { stage, api } = demo(el, ctx, {
    hint: 'Six things that can go wrong when saving a profile. The left box is what your code gets; the right box is what you show.',
    server: { latency: 70, delay: 50 },
    routes: { '*': () => current.reply },
  });
  const row = stage.row();
  const got = notes(row, 'Your code got');
  const shown = toast(row, 'The visitor sees');

  cycle(
    stage,
    CASES,
    async (c) => {
      current = c;
      got.pending();
      shown.clear();
      stage.say(`Saving the profile: ${c.label}`);
      try {
        await api.put('https://app.example/profile', { json: { name: 'Mase' }, retry: 0, ...c.options });
      } catch (error) {
        if (stage.disposed) throw error;
        got.set([[kyName(error), 'bad']]);
        const text = friendly(error);
        shown.show(text, 'warn');
        stage.say(`${c.label}: "${text}"`, 'info');
      }
    },
    { control: 'What goes wrong', pause: 1800 },
  );
  return stage.dispose;
};

export default mount;
