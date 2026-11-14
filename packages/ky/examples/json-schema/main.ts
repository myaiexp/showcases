// .json(schema): data that fails your zod schema never reaches your code
import { SchemaValidationError } from 'ky';
import { z } from 'zod';
import type { Mount } from '@/types.ts';
import { resultView } from '../../shared/panels.ts';
import { scene } from '../../shared/inst-kit.ts';
import { cycle, notes } from '../../shared/req-kit.ts';

// What an account page needs: a name and a number age.
const profile = z.object({ name: z.string(), age: z.number() });

const ANSWERS = [
  { label: 'Good data', json: { name: 'Aino', age: 34 } },
  { label: 'Age arrives as text', json: { name: 'Aino', age: '34' } },
  { label: 'Name is missing', json: { age: 34 } },
];

const mount: Mount = (el, ctx) => {
  let payload: unknown = ANSWERS[0]!.json;
  const { stage, server, api } = scene(el, ctx, {
    hint: 'The server always says 200 OK. Pick what its data looks like and see what your code gets.',
    // A healthy answer every time: only the shape of the data changes.
    routes: { '/profile': () => ({ json: payload }) },
  });
  const row = stage.row();
  const sent = notes(row, 'Server sent');
  const out = resultView(row, 'Your code got');
  server.on((e) => e.kind === 'reply' && sent.set([['200 OK', 'ok'], JSON.stringify(payload)]));

  cycle(stage, ANSWERS, async (item) => {
    payload = item.json;
    out.pending();
    sent.pending();
    stage.say('Asking for the profile and checking it against the schema…');
    try {
      // The Ky call: .json() takes a Standard Schema (zod here) and checks the parsed data.
      const user = await api.get('https://shop.example/profile').json(profile);
      out.value(user, 'passes the check');
      stage.say(`Data is what we expected: ${user.name} is ${user.age}.`, 'ok');
    } catch (error) {
      if (!(error instanceof SchemaValidationError)) throw error;
      // The request itself worked; the schema said no, and lists what was wrong.
      const why = error.issues.map((i) => `${(i.path ?? []).map((p) => String(typeof p === 'object' ? p.key : p)).join('.')}: ${i.message}`).join('\n');
      out.error(error, why);
      stage.say('The server said OK, but the data is wrong, so your code gets an error.', 'bad');
    }
  });
  return stage.dispose;
};

export default mount;
