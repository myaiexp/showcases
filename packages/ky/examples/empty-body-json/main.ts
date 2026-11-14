// .json() on an empty answer throws, unless parseJson says otherwise
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo, notes } from '../../shared/req-kit.ts';
import { resultView } from '../../shared/panels.ts';

type Answer = { status: number; text?: string };
const NO_CONTENT: Answer = { status: 204 };
const EMPTY_OK: Answer = { status: 200, text: '' };
const WITH_DATA: Answer = { status: 200, text: '{"removed":true}' };

const describe = (a: Answer): string => `${a.status}${a.status === 204 ? ' No Content' : ''}, ${a.text ? a.text : 'nothing in the body'}`;

const CASES = [
  { label: 'delete answers 204, you call .json()', answer: NO_CONTENT, mode: 'json' },
  { label: 'delete answers 200 but empty, .json()', answer: EMPTY_OK, mode: 'json' },
  { label: 'same 204, you skip .json()', answer: NO_CONTENT, mode: 'skip' },
  { label: 'same 204, .json() plus parseJson', answer: NO_CONTENT, mode: 'parse' },
  { label: 'delete answers with data, .json()', answer: WITH_DATA, mode: 'json' },
] as const;

const mount: Mount = (el, ctx) => {
  let answer: Answer = NO_CONTENT;
  const { stage, api } = demo(el, ctx, {
    hint: 'After a delete, many servers answer with nothing at all. See what .json() does with that.',
    routes: { 'DELETE /comments/9': () => (answer.text === undefined ? { status: answer.status } : { status: answer.status, text: answer.text, headers: { 'content-type': 'application/json' } }) },
  });
  const row = stage.row();
  const sent = notes(row, 'Server answered');
  const result = resultView(row, 'Your code got');
  const url = 'https://blog.example/comments/9';

  cycle(stage, CASES, async (c) => {
    answer = c.answer;
    sent.set([describe(c.answer)]);
    stage.say(c.label);
    const out = await attempt(stage, result, () => {
      // Nothing to read: ask for the response itself and look at its status.
      if (c.mode === 'skip') return api.delete(url).then((r) => ({ deleted: r.status }));
      // parseJson decides what empty text means: here, null instead of an error.
      if (c.mode === 'parse') return api.delete(url, { parseJson: (text) => (text ? JSON.parse(text) : null) }).json();
      return api.delete(url).json();
    });
    if (!out.ok) stage.say('JSON cannot be read from nothing: Ky throws.', 'warn');
    else stage.say(c.answer.text ? 'There is data, so .json() works.' : 'Nothing to parse, and your code copes.', 'ok');
  }, { control: 'Case', pause: 2200 });
  return stage.dispose;
};

export default mount;
