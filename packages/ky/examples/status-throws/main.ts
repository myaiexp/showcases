// Which answers make Ky throw: every status outside 200 to 299
import type { Mount } from '@/types.ts';
import { attempt, demo, serial } from '../../shared/req-kit.ts';
import { outcome, statusGrid } from '../../shared/err-kit.ts';
import { STATUS_TEXT } from '../../shared/server-body.ts';

const CARD = [200, 201, 204, 400, 401, 404, 500, 503];
const FULL = [200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500, 503];

const mount: Mount = (el, ctx) => {
  const { stage, api } = demo(el, ctx, {
    hint: 'Click a status code to ask the server for it. Green: Ky hands you the answer. Red: Ky throws an error.',
    server: { latency: 80, delay: 60 },
    routes: {
      // /status/404 answers with status 404, and so on.
      '/status/*': (req) => {
        const status = Number(req.url.pathname.split('/').pop());
        return { status, json: status >= 400 ? { error: STATUS_TEXT[status] } : { ok: true } };
      },
    },
  });
  const enqueue = serial(stage);
  const grid = statusGrid(stage.root, stage.preview ? CARD : FULL, !stage.preview, (s) => enqueue(() => run(s)));
  const result = outcome(stage.row());

  async function run(status: number): Promise<void> {
    const name = `${status} ${STATUS_TEXT[status] ?? ''}`.trim();
    grid.now(status);
    stage.say(`Asking for a ${name}…`);
    // retry: 0 so the first answer is the one shown: Ky would retry 500 and 503 by default.
    // A status outside 200-299 makes Ky throw an HTTPError; inside it, you get the Response.
    const out = await attempt(stage, result, () => api.get(`https://api.example/status/${status}`, { retry: 0 }));
    grid.mark(status, out.ok ? 'fine' : 'throws', out.ok ? 'ok' : 'bad');
    stage.say(out.ok ? `${name}: fine, you get the answer.` : `${name}: Ky throws an HTTPError.`, out.ok ? 'ok' : 'bad');
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      grid.reset();
      for (const s of CARD) {
        await run(s);
        await wait(350);
      }
      await wait(1200);
    });
  } else {
    enqueue(() => run(404));
  }
  return stage.dispose;
};

export default mount;
