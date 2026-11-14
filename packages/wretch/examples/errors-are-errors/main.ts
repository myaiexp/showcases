// Plain fetch resolves on a 404; wretch rejects it and calls its handler
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { compare } from '../../shared/compare.ts';
import { select } from '../../shared/controls.ts';
import { BASE, createServer, statusText } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

const STATUSES = [200, 404, 401, 418, 500] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose what the simulated server answers; both columns ask the same thing.' });
  let answer: number = 404;
  const server = createServer(stage, {
    'GET /posts/1': () => (answer === 200 ? { json: { id: 1, title: 'Morning light' } } : { status: answer, text: 'nope' }),
  });
  wire(stage, server, { rows: 0 });
  const [plain, nice] = compare(stage.root, 'line');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const plainFetch = async (): Promise<void> => {
    // `server.fetch` stands in for the browser's own fetch: same call, answered inside the page.
    const response = await server.fetch(`${BASE}/posts/1`);
    if (stage.disposed) return;
    plain.step('the promise resolved', 'ok');
    if (response.ok) plain.done('status 200: all good', 'ok');
    else plain.done(`but the status was ${response.status}, and nothing said so`, 'warn');
  };

  const withWretch = async (): Promise<void> => {
    const ran = (name: string, status: number): void => {
      if (stage.disposed) return;
      nice.step('the promise rejected', 'warn');
      nice.done(`${name} ran for the ${status} ${statusText(status)}`, 'warn');
    };
    await api
      .get('/posts/1')
      .notFound(() => ran('.notFound()', 404))
      .unauthorized(() => ran('.unauthorized()', 401))
      .error(418, () => ran('.error(418)', 418))
      .internalError(() => ran('.internalError()', 500))
      .json(() => {
        if (stage.disposed) return;
        nice.step('the promise resolved', 'ok');
        nice.done('.json() got the post', 'ok');
      });
  };

  const run = async (): Promise<void> => {
    plain.reset();
    nice.reset();
    stage.say(`The server answers ${answer} ${statusText(answer)}`);
    await Promise.all([plainFetch(), withWretch()]);
    if (stage.disposed) return;
    stage.say(
      answer === 200 ? 'A good answer: both end up with the data' : `Only wretch noticed the ${answer}: it counted it as a failure`,
      answer === 200 ? 'ok' : 'warn',
    );
  };
  const safe = (): void => void run().catch(() => {});

  if (stage.bar) {
    select(stage.bar, 'Server answers', STATUSES.map((s) => [s, `${s} ${statusText(s)}`] as const), (s) => {
      answer = s;
      safe();
    }, answer);
  }
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const s of STATUSES) {
        answer = s;
        await run();
        await wait(1500);
      }
    });
  } else safe();
  return () => stage.dispose();
};

export default mount;
