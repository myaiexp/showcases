// One request, many answers: each status goes to the catcher named after it
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { chips } from '../../shared/chips.ts';
import { button, select } from '../../shared/controls.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

const STATUSES = [200, 400, 401, 403, 404, 408, 500] as const;
const HANDLERS = ['.badRequest()', '.unauthorized()', '.forbidden()', '.notFound()', '.timeout()', '.internalError()', '.json()'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose what the simulated server answers, then send.' });
  let answer: number = 200;
  // The server answers with whatever status is picked.
  const server = createServer(stage, {
    'GET /profile': () => (answer === 200 ? { json: { name: 'Aino', plan: 'free' } } : { status: answer, text: 'nope' }),
  });
  wire(stage, server, { rows: stage.preview ? 0 : 6 });
  const ran = chips(stage.root, HANDLERS);

  const send = (): Promise<void> => {
    ran.reset();
    const hit = (name: string, tone: 'ok' | 'warn' | 'bad') => (err: { status: number }) => {
      ran.fire(name, tone, `${err.status}: ${name} ran, .json() was skipped`);
    };
    return wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get('/profile')
      .badRequest(hit('.badRequest()', 'warn'))
      .unauthorized(hit('.unauthorized()', 'warn'))
      .forbidden(hit('.forbidden()', 'warn'))
      .notFound(hit('.notFound()', 'warn'))
      .timeout(hit('.timeout()', 'warn'))
      .internalError(hit('.internalError()', 'bad'))
      .json((profile: { name: string }) => ran.fire('.json()', 'ok', `200: .json() got the profile of ${profile.name}`))
      .catch(() => {}); // only an aborted request (the card closing) ends up here
  };

  if (stage.bar) {
    select(stage.bar, 'Server answers', STATUSES.map((s) => [s, String(s)] as const), (s) => (answer = s));
    button(stage.bar, 'Send request', () => void send());
  }
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const s of STATUSES) {
        answer = s;
        stage.say(`The server answers ${s}`);
        await send();
        await wait(1500);
      }
    });
  } else void send();
  return () => stage.dispose();
};

export default mount;
