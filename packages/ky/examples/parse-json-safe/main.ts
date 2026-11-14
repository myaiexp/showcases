// A parseJson that drops __proto__ keys so sneaky answers stay out
import type { Mount } from '@/types.ts';
import { scene } from '../../shared/inst-kit.ts';
import { cycle, notes } from '../../shared/req-kit.ts';

const ANSWERS = [
  { label: 'Friendly answer', text: '{"name":"Aino","theme":"dark"}' },
  { label: 'Sneaky answer', text: '{"name":"Eve","theme":"dark","__proto__":{"isAdmin":true}}' },
];

const mount: Mount = (el, ctx) => {
  let text = ANSWERS[0]!.text;
  const { stage, api } = scene(el, ctx, {
    hint: 'Your page merges the answer into its settings. A hidden __proto__ key can smuggle in extra fields.',
    routes: { '/profile': () => ({ text, headers: { 'content-type': 'application/json' } }) },
  });
  const row = stage.row();
  const left = notes(row, 'Default parser');
  const right = notes(row, 'With a safe parseJson');

  // Merge the answer into the page's own settings, like many apps do.
  const settings = (answer: object): Record<string, unknown> => Object.assign({}, { theme: 'light' }, answer);
  const verdict = (answer: object): [string, 'ok' | 'bad'][] => {
    const merged = settings(answer);
    const admin = merged['isAdmin'] === true;
    return [
      [`answer has: ${Object.getOwnPropertyNames(answer).join(', ')}`, 'ok'],
      [admin ? 'settings.isAdmin is true' : 'settings.isAdmin is not set', admin ? 'bad' : 'ok'],
    ];
  };

  cycle(stage, ANSWERS, async (item) => {
    text = item.text;
    left.pending();
    right.pending();
    stage.say('Reading the same answer with two parsers…');
    const url = 'https://app.example/profile';
    left.set(verdict(await api.get(url).json<object>()));
    // The Ky option: a parser that throws away any __proto__ key while reading.
    const safe = await api.get(url, { parseJson: (t) => JSON.parse(t, (key, value: unknown) => (key === '__proto__' ? undefined : value)) as object }).json<object>();
    right.set(verdict(safe));
    stage.say(item.text.includes('__proto__') ? 'The default parser let the hidden key make the settings admin.' : 'Nothing hidden here: both parsers agree.', item.text.includes('__proto__') ? 'bad' : 'ok');
  });
  return stage.dispose;
};

export default mount;
