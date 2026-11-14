// One request through plain fetch and through Ky: only Ky notices an error
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { resultView } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';

const ANSWERS = [
  [200, 'a success (200)'],
  [404, 'not found (404)'],
  [500, 'a server crash (500)'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick what the server answers; both sides send the same request.' });
  let status = 200;
  const server = stage.server({
    '/order/42': () => (status === 200 ? { json: { order: 42, total: 18.5 } } : { status, json: { error: 'Sorry, no order here' } }),
  });
  stage.wire(server, { label: (r) => `${r.method} ${r.url.pathname}` });
  const row = stage.row();
  const left = resultView(row, 'plain fetch');
  const right = resultView(row, 'ky');

  const url = 'https://api.example/order/42';

  // Plain fetch: send, then remember to check response.ok yourself, then parse.
  const withFetch = async (): Promise<void> => {
    const response = await server.fetch(url);
    const data: unknown = await response.json();
    left.value(data, 'no error: carries on');
  };

  // Ky: the same request; an error answer throws, so bad data never reaches your code.
  const withKy = async (): Promise<void> => {
    const api = ky.extend({ fetch: server.fetch });
    try {
      right.value(await api.get(url, { retry: 0 }).json(), 'data');
    } catch (error) {
      right.error(error);
    }
  };

  const run = async (s: number): Promise<void> => {
    status = s;
    left.pending();
    right.pending();
    await Promise.all([withFetch(), withKy()]);
    stage.say(
      s === 200 ? 'A success looks the same both ways.' : `On ${s}, fetch hands your code the error page as if it were the order; Ky throws.`,
      s === 200 ? 'ok' : 'warn',
    );
  };

  if (stage.preview) {
    let i = 0;
    stage.play(async (wait) => {
      await run(ANSWERS[i++ % ANSWERS.length]![0]);
      await wait(1500);
    });
  } else {
    select(stage.bar!, 'Server answers', ANSWERS, (s) => stage.task(() => run(s)));
    stage.task(() => run(200));
  }
  return stage.dispose;
};

export default mount;
