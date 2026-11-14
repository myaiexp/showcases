// One failed check, worded by Zod's built-in locales: the same issue in a dozen languages
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { keepConfig, localeConfig, settle } from '../../shared/error-config.ts';
import { lineTable } from '../../shared/error-lines.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// Locale code (a key of z.locales) and the language's name.
const LANGUAGES = [
  ['en', 'English'],
  ['de', 'German'],
  ['fr', 'French'],
  ['es', 'Spanish'],
  ['ja', 'Japanese'],
  ['ru', 'Russian'],
  ['pt', 'Portuguese'],
  ['zhCN', 'Simplified Chinese'],
  ['ar', 'Arabic'],
  ['hi', 'Hindi'],
  ['tr', 'Turkish'],
  ['ko', 'Korean'],
] as const;

const MISTAKES = [
  { label: 'Too short', code: 'z.string().min(3)', schema: z.string().min(3), input: 'ab' },
  { label: 'Wrong type', code: 'z.number()', schema: z.number(), input: '42' },
  { label: 'Not an email', code: 'z.email()', schema: z.email(), input: 'ada@' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a mistake: the same issue is worded by each locale.' });
  const call = codeLine(stage.root, '');
  const table = lineTable(stage.root, (fn, i) => stage.after(i * 260, fn));
  // A card has room for four lines of wrapped text.
  const rows = stage.preview ? [LANGUAGES[0], LANGUAGES[1], LANGUAGES[4], LANGUAGES[5]] as const : LANGUAGES;

  const show = (m: (typeof MISTAKES)[number]): void => {
    call.textContent = `${m.code}.safeParse(${JSON.stringify(m.input)})  under z.config(z.locales.xx())`;
    table.show(
      rows.map(([code, name]) => {
        // Set the locale, parse, read the message, restore: one synchronous block.
        const r = keepConfig(() => {
          z.config(localeConfig(code));
          return settle(m.schema.safeParse(m.input));
        });
        return { tag: code, sub: name, text: r.success ? '' : r.error.issues[0]!.message, tone: 'bad' as const };
      }),
      stage.preview,
    );
    stage.say(`✗ One mistake, ${rows.length} languages: hover a code for the language's name`, 'bad');
  };
  const at = stage.cycle(MISTAKES, 4200, show);
  if (stage.bar) select(stage.bar, 'Mistake', MISTAKES.map((m, i) => [i, m.label] as const), (i) => at(i));
  return stage.dispose;
};

export default mount;
