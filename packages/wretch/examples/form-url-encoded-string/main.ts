// A string given to .formUrl() is sent as it is; an object is encoded for you
import wretch from 'wretch';
import FormUrlAddon from 'wretch/addons/formUrl';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { twin } from '../../shared/twin.ts';

const CASES: { label: string; object: object; text: string; say: string }[] = [
  { label: 'Same bytes', object: { a: 1, b: { c: 2 } }, text: 'a=1&b=%7B%22c%22%3A2%7D', say: 'The ready-made string and the object give the same request' },
  { label: 'Different spelling', object: { a: 1, b: 'hello world' }, text: 'a=1&b=hello+world', say: 'Different bytes (%20 against +), though a server reads both as "hello world"' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two ways to send one form: from an object, and from a string you encoded yourself.' });
  const server = createServer(stage, { 'POST /search': () => ({ json: { ok: true } }) });
  const both = twin(stage, 'From an object', 'From a string', ['content-type']);

  const api = wretch(`${BASE}/search`).fetchPolyfill(server.fetch).addon(FormUrlAddon);

  runCases(
    stage,
    CASES.map((c) => ({
      label: c.label,
      run: async () => {
        both.show(null, null);
        stage.say(`.formUrl(${JSON.stringify(c.text)})`);
        await api.formUrl(c.object).post().res().catch(() => {});
        await api.formUrl(c.text).post().res().catch(() => {});
        if (stage.disposed) return;
        const [first, second] = server.requests.slice(-2) as [(typeof server.requests)[number], (typeof server.requests)[number]];
        const same = both.show(first, second);
        stage.say(c.say, same ? 'ok' : 'info');
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
