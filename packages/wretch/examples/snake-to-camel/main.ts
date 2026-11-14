// The server speaks snake_case, the app camelCase: one client translates
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { pane } from '../../shared/pane.ts';
import { columns } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { camelToSnake, keyLines, snakeToCamel } from './names.ts';

const USER = { first_name: 'Aino', last_login: '2026-11-12', home_address: { street_name: 'Lake road 4', zip_code: '40100' } };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: the keys as they travel. Right: the keys as the app sees them.' });
  const server = createServer(stage, {
    'GET /users/1': () => ({ json: USER }),
    'POST /users': () => ({ status: 201, json: { ok: true } }),
  });
  wire(stage, server, { rows: 0 });
  const [a, b] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const wireSide = pane(a, 'On the wire (snake_case)');
  const appSide = pane(b, 'In the app (camelCase)');

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    // Going out: the app's camelCase body is rewritten as snake_case just before sending.
    .defer((req, _url, opts) => {
      if (typeof opts.body !== 'string') return req;
      try {
        return req.body(JSON.stringify(camelToSnake(JSON.parse(opts.body))));
      } catch {
        return req;
      }
    })
    // Coming back: every parsed answer is rewritten as camelCase.
    .resolve((chain) => chain.json((json) => snakeToCamel(json)));

  const show = (side: typeof wireSide, value: unknown): void => {
    side.clear();
    for (const line of keyLines(value)) side.add(line);
  };

  const load = async (): Promise<void> => {
    wireSide.clear();
    appSide.clear();
    stage.say('api.get("/users/1"): the server answers in snake_case');
    const user = await api.get('/users/1').catch(() => null);
    if (stage.disposed || !user) return;
    show(wireSide, USER);
    show(appSide, user);
    stage.say('The app never sees first_name: it reads user.firstName', 'ok');
  };

  const save = async (): Promise<void> => {
    wireSide.clear();
    appSide.clear();
    const draft = { firstName: 'Aino', phoneNumber: '040 123', homeAddress: { streetName: 'Lake road 4' } };
    show(appSide, draft);
    stage.say('api.post(draft, "/users"): the app sends camelCase');
    await api.post(draft, '/users').catch(() => null);
    if (stage.disposed) return;
    const sent = server.requests.at(-1)!.body;
    show(wireSide, sent.kind === 'json' ? sent.value : {});
    stage.say('The deferred step renamed every key, nested ones too, before it left', 'ok');
  };

  runCases(stage, [
    { label: 'Load a user', run: load },
    { label: 'Save a user', run: save },
  ], 2400);
  return () => stage.dispose();
};

export default mount;
