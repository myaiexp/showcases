// parseJson also gets the request and response, to log and explain
import type { Mount } from '@/types.ts';
import { logView, resultView } from '../../shared/panels.ts';
import { attempt, cycle } from '../../shared/req-kit.ts';
import { scene } from '../../shared/inst-kit.ts';

const CALLS = [
  { label: 'Weather forecast', path: '/forecast' },
  { label: 'Headlines', path: '/headlines' },
  { label: 'Broken answer', path: '/broken' },
];

const mount: Mount = (el, ctx) => {
  const { stage, api } = scene(el, ctx, {
    hint: 'Pick a call. Your parseJson function reports which address and status each text came from.',
    routes: {
      '/forecast': { json: { city: 'Oulu', temp: -3 } },
      '/headlines': { json: { items: ['Snow tonight', 'Bus strike ends'] } },
      // The server cut this answer off halfway, so it is not valid JSON.
      '/broken': { text: '{"items": ["Snow to', headers: { 'content-type': 'application/json' } },
    },
  });
  const row = stage.row();
  const log = logView(row, 'Your parseJson log', stage.preview ? 4 : 8);
  const out = resultView(row, 'Your code got');

  cycle(stage, CALLS, async (item) => {
    stage.say(`Reading ${item.path}…`);
    const got = await attempt(stage, out, () =>
      api
        .get(`https://news.example${item.path}`, {
          // The Ky option: a parser that is told which request and response the text belongs to.
          parseJson: (text, { request, response }) => {
            const where = new URL(request.url).pathname;
            log.add(`${where} (status ${response.status}): ${text.length} characters`);
            try {
              return JSON.parse(text);
            } catch {
              log.add(`${where}: cannot be read`, 'bad');
              throw new Error(`The answer from ${where} was cut off`);
            }
          },
        })
        .json(),
    );
    stage.say(got.ok ? 'The log shows every answer that was read.' : 'Your own message says which address broke.', got.ok ? 'ok' : 'bad');
  });
  return stage.dispose;
};

export default mount;
