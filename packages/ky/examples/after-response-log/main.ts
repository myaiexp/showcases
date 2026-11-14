// An afterResponse hook logs every answer while the page reads its own
import type { Mount } from '@/types.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { logView } from '../../shared/panels.ts';

const mount: Mount = (el, ctx) => {
  const { stage, api, lane, go } = hookScene(el, ctx, {
    hint: 'Three calls, one hook. The hook keeps the left log; the calls keep the right.',
    routes: {
      '/weather': { json: { city: 'Oulu', temp: -3 } },
      '/news': { json: { headlines: 4 } },
    },
  });
  const row = stage.row();
  const logged = logView(row, 'The hook saw', stage.preview ? 3 : 6);
  const got = logView(row, 'Your code got', stage.preview ? 3 : 6);
  const logs = { clear: () => (logged.clear(), got.clear()) };

  const hooks = lane.hooks({
    afterResponse: [
      async ({ request, response }) => {
        // `response` is a copy made for the hook: reading its body does not use up the caller's.
        const text = (await response.text()).slice(0, 24);
        logged.add(`${new URL(request.url).pathname} ${response.status} ${text}`, response.ok ? 'ok' : 'warn');
        lane.note('afterResponse', 'logged an answer');
      },
    ],
  });

  go(async () => {
    logs.clear();
    stage.say('Making three calls that each know nothing about logging…');
    for (const path of ['weather', 'news', 'sports']) {
      try {
        const body = await api.get(`https://app.example/${path}`, { retry: 0, hooks }).json();
        got.add(`${path}: ${JSON.stringify(body)}`, 'ok');
      } catch (err) {
        if (stage.disposed) throw err;
        got.add(`${path}: ${err instanceof Error ? err.name : 'error'}`, 'bad');
      }
      await stage.wait(150);
    }
    stage.say('The hook saw all three, including the 404; your code read its own copies.', 'ok');
  });
  return stage.dispose;
};

export default mount;
