// A dropped connection is retried for reads, but a lost write is left alone
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { plural, retryLab } from '../../shared/retry-lab.ts';

type Method = 'get' | 'post';

const mount: Mount = (el, ctx) => {
  let method: Method = 'get';
  let drops = 2;
  const lab = retryLab(el, ctx, {
    hint: 'The phone loses signal for a moment: the connection drops before any answer. Ky may retry twice.',
    span: 2500,
    // `drop: true` loses the connection after the request arrives.
    routes: { '*': (req) => (req.n <= drops ? { drop: true } : { json: { ok: true } }) },
  });

  const send = (): Promise<boolean> =>
    lab.attempt({
      say: `${method === 'get' ? 'Loading the feed' : 'Posting a comment'}; the connection drops ${plural(drops, 'time', 'times')}…`,
      // No retry options: a network error is retried by default, for the methods in `retry.methods`.
      call: () =>
        method === 'get'
          ? lab.api.get('https://social.example/feed', { retry: 2 }).json()
          : lab.api.post('https://social.example/comments', { json: { text: 'Nice!' }, retry: 2 }).json(),
      ok: () => ({ say: `Connection lost ${plural(drops, 'time', 'times')}, and Ky reconnected on its own. Your code never noticed.` }),
      bad: () =>
        method === 'post'
          ? 'Ky did not repeat the POST: after a drop it cannot know whether the comment was saved.'
          : `The connection dropped ${plural(lab.server.requests.length, 'time', 'times')}: more than the 2 retries allowed.`,
      mark: 'gave up',
      badTone: 'warn',
    });

  if (lab.stage.preview) {
    const steps: [Method, number][] = [['get', 2], ['post', 1]];
    let i = 0;
    lab.start(async () => {
      [method, drops] = steps[i++ % steps.length]!;
      await send();
    }, 1100);
  } else {
    select<Method>(lab.stage.bar!, 'request:', [['get', 'GET: load the feed'], ['post', 'POST: send a comment']], (v) => (method = v));
    slider(lab.stage.bar!, 'drops:', 1, 3, 1, drops, (v) => (drops = v), (v) => `${v}×`);
    lab.start(async () => void (await send()), 1500, 'Send');
  }
  return lab.dispose;
};

export default mount;
