// .toFetch() turns a configured client into a fetch for code that needs one
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { USERS } from '../../shared/data.ts';
import { envelope } from '../../shared/envelope.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';
import { userBadge } from './widget.ts';

const TOKENS = ['good-token', 'expired-token'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick the login the client holds, then let the widget load.' });
  const server = createServer(stage, {
    'GET /users': (req) =>
      req.headers.get('authorization') === 'Bearer good-token' ? { json: USERS } : { status: 401, json: { error: 'Please sign in' } },
  });
  const w = wire(stage, server, { rows: stage.preview ? 1 : 3 });
  envelope(stage, { title: 'What the server received', headers: ['authorization'], noBody: true }).follow(server);
  const screen = pane(stage.root, 'Third-party widget (it only knows fetch)');
  screen.set('Waiting…', 'dim');

  const load = async (token: string): Promise<void> => {
    // The client: login header and a 401 rule, then converted into a plain fetch function.
    const myFetch = wretch(BASE)
      .fetchPolyfill(server.fetch)
      .auth(`Bearer ${token}`)
      .catcher(401, (error) => {
        w.note('.catcher(401) ran: "please sign in again"', 'warn');
        // A catcher's return value becomes the result. Return the Response so the widget still gets one:
        // returning nothing would hand the widget `undefined` (it would crash on `.ok`).
        return error.response;
      })
      .toFetch();

    stage.say(`The widget calls fetch("/users", { method: "GET" }) with the "${token}" client`);
    const message = await userBadge(myFetch);
    if (stage.disposed) return;
    const good = token === 'good-token';
    screen.set(message, good ? 'ok' : 'warn');
    stage.say(
      good
        ? 'The widget never wrote a login header, but the client added it'
        : 'The 401 was caught by the client and the widget still got an ordinary answer',
      good ? 'ok' : 'warn',
    );
  };
  const safe = (token: string): void => void load(token).catch(() => {});

  let token: string = TOKENS[0];
  if (stage.bar) {
    select(stage.bar, 'Client holds', TOKENS.map((t) => [t, t] as const), (t) => (token = t));
    button(stage.bar, 'Widget: load users', () => safe(token));
  }
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const t of TOKENS) {
        await load(t);
        await wait(2000);
      }
    });
  } else safe(token);
  return () => stage.dispose();
};

export default mount;
