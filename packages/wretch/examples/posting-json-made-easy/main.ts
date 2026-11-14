// fetch needs method, header and stringify to post JSON; .post(object) doesn't
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { compare } from '../../shared/compare.ts';
import { button } from '../../shared/controls.ts';
import { envelope } from '../../shared/envelope.ts';
import { BASE, createServer, type ServerRequest } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const PEOPLE = [
  { name: 'Aino', plan: 'free' },
  { name: 'Ben', plan: 'pro' },
  { name: 'Chloé', plan: 'team' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same object is posted twice, once by each column.' });
  const server = createServer(stage, { 'POST /signup': () => ({ status: 201, json: { ok: true } }) });
  const [plain, nice] = compare(stage.root, 'line');
  const seen = {
    plain: envelope(stage, { parent: plain.extra, title: 'Server received', headers: ['content-type'] }),
    nice: envelope(stage, { parent: nice.extra, title: 'Server received', headers: ['content-type'] }),
  };

  const api = wretch(BASE).fetchPolyfill(server.fetch);
  const last = (): ServerRequest => server.requests[server.requests.length - 1]!;

  const post = async (person: { name: string; plan: string }): Promise<void> => {
    plain.reset();
    nice.reset();
    seen.plain.show(null);
    seen.nice.show(null);
    stage.say(`Posting { name: "${person.name}", plan: "${person.plan}" } the long way, then the short way`);

    // `server.fetch` stands in for the browser's own fetch: same call, answered inside the page.
    plain.step('method: "POST"');
    plain.step(stage.preview ? 'headers: {…}' : 'headers: { "Content-Type": "application/json" }');
    plain.step(stage.preview ? 'JSON.stringify(…)' : 'body: JSON.stringify(person)');
    await server.fetch(`${BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
    });
    if (stage.disposed) return;
    const longWay = last();
    seen.plain.show(longWay);

    nice.step('.post(person, "/signup")');
    await api.post(person, '/signup').res();
    if (stage.disposed) return;
    const shortWay = last();
    seen.nice.show(shortWay);

    const same =
      longWay.method === shortWay.method &&
      longWay.headers.get('content-type') === shortWay.headers.get('content-type') &&
      longWay.body.kind === 'json' &&
      shortWay.body.kind === 'json' &&
      longWay.body.text === shortWay.body.text;
    stage.say(
      same ? 'The server sees the same request both times. One column wrote 3 lines, the other 1' : 'The two requests differ',
      same ? 'ok' : 'bad',
    );
  };
  const safe = (p: (typeof PEOPLE)[number]): void => void post(p).catch(() => {});

  let next = 0;
  if (stage.bar) button(stage.bar, 'Post another person', () => safe(PEOPLE[++next % PEOPLE.length]!));
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const p of PEOPLE) {
        await post(p);
        await wait(2000);
      }
    });
  } else safe(PEOPLE[0]!);
  return () => stage.dispose();
};

export default mount;
