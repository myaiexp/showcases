// parseJson with a reviver: date text in the answer arrives as real Dates
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { compact, runner, scene } from '../../shared/inst-kit.ts';
import type { Tone } from '../../shared/panels.ts';
import { notes } from '../../shared/req-kit.ts';

type Reply = Record<string, unknown>;

// A reviver is the second argument of JSON.parse: it sees every key and value on the way in.
const RULES = [
  ['keys', 'keys ending in _at', (key: string, value: unknown) => (key.endsWith('_at') ? new Date(String(value)) : value)],
  ['shape', 'any text shaped like a date', (_key: string, value: unknown) => (typeof value === 'string' && /^\d{4}-\d\d-\d\d/.test(value) ? new Date(value) : value)],
] as const;

const day = (d: Date): string => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

const mount: Mount = (el, ctx) => {
  let rule: (typeof RULES)[number] = RULES[0];
  const { stage, api } = scene(el, ctx, {
    hint: 'Every date in JSON is just text. A reviver can turn the ones you choose into real dates.',
    // The concert listing: two times, and a promo code that merely looks like a date.
    routes: { '/event': { json: { name: 'Winter concert', starts_at: '2026-12-24T18:00', ends_at: '2026-12-24T20:30', promo_code: '2026-12-24' } } },
  });
  const row = stage.row();
  const left = notes(row, 'Plain .json()');
  const right = notes(row, 'With parseJson');
  if (stage.bar) select(stage.bar, 'Turn into dates:', RULES.map((r) => [r, r[1]] as const), (r) => (rule = r));

  const lines = (data: Reply): (string | readonly [string, Tone])[] => {
    const shown = ['starts_at', 'ends_at', 'promo_code'].map((key): string | readonly [string, Tone] => {
      const v = data[key];
      return v instanceof Date ? [`${key}: Date, ${day(v)}`, key === 'promo_code' ? 'bad' : 'ok'] : `${key}: ${compact(v)}`;
    });
    const start = data['starts_at'];
    // What the page can do with it: only a real Date knows its weekday.
    shown.push(start instanceof Date ? [`starts_at.getDay() works`, 'ok'] : ['starts_at.getDay() is not a function', 'warn']);
    return shown;
  };

  runner(stage, async () => {
    left.pending();
    right.pending();
    stage.say('Same answer twice: once as it comes, once through parseJson.');
    const url = 'https://tickets.example/event';
    left.set(lines(await api.get(url).json<Reply>()));
    // The Ky call: parseJson replaces JSON.parse, here with a reviver as the second argument.
    const revived = await api.get(url, { parseJson: (text) => JSON.parse(text, rule[2]) as Reply }).json<Reply>();
    right.set(lines(revived));
    const promo = revived['promo_code'] instanceof Date;
    stage.say(promo ? 'Careful: the promo code was turned into a Date too.' : 'The times are real dates now: you can sort them and do sums.', promo ? 'warn' : 'ok');
  });
  return stage.dispose;
};

export default mount;
