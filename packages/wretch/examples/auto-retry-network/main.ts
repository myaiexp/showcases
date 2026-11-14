// retry({ retryOnNetworkError: true }): dropped connections are tried again
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { timeline } from '../../shared/timeline.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose how many connections the server drops before it works, then send.' });
  let drops = 2;
  // The server drops the first `drops` connections of each run, then answers.
  const server = createServer(stage, {
    'GET /posts/1': (req) => (req.attempt <= drops ? { network: true } : { json: { id: 1, title: 'Morning light over the lake' } }),
  });
  const tl = timeline(stage, server, { span: 4500 });

  // Retrying is a middleware: built inside mount so every mount has its own.
  const resilientApi = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .middlewares([retry({ maxAttempts: 3, retryOnNetworkError: true })]);

  let busy = false;
  const run = async (): Promise<void> => {
    if (busy) return;
    busy = true;
    tl.reset();
    stage.say(`The server will drop the first ${drops} connection${drops === 1 ? '' : 's'}`);
    try {
      await resilientApi
        .get('/posts/1')
        .fetchError(() => {
          if (!stage.disposed) stage.say('Every try failed, so wretch gave up and the app shows an error message', 'bad');
        })
        .json((post: { title: string }) => {
          if (!stage.disposed) {
            const tries = server.requests.length;
            stage.say(`Got "${post.title}" on try ${tries}, and the app never saw the failures`, 'ok');
          }
        });
    } finally {
      busy = false;
    }
  };
  const safe = (): void => void run().catch(() => {});

  if (stage.bar) {
    slider(stage.bar, 'Connections dropped', 0, 4, 1, drops, (v) => (drops = v));
    button(stage.bar, 'Send request', safe);
  }
  if (stage.preview) {
    let n = 0;
    stage.play(async (wait) => {
      drops = n++ % 2 === 0 ? 2 : 4;
      await run();
      await wait(1800);
    });
  } else safe();
  return () => stage.dispose();
};

export default mount;
