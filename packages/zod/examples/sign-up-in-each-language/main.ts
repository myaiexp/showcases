// A whole bad sign-up checked under one locale at a time: every issue arrives in that language
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { select } from '../../shared/controls.ts';
import { keepConfig, localeConfig, settle } from '../../shared/error-config.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, plural } from '../../shared/widgets.ts';

const SignUp = z.object({
  name: z.string().min(3),
  email: z.email(),
  age: z.number().min(18),
});

const INPUT = { name: 'Al', email: 'al@', age: 15 };

const LANGUAGES = [
  ['de', 'German'],
  ['fr', 'French'],
  ['ja', 'Japanese'],
  ['es', 'Spanish'],
  ['ru', 'Russian'],
  ['pl', 'Polish'],
  ['en', 'English'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a language: the schema is the same, only z.config() changes.' });
  const call = codeLine(stage.root, '');
  const check = checkpoint(stage.root, stage, { label: 'SignUp', messages: true, inTitle: 'Sign-up', outTitle: 'Issues' });
  const show = ([code, name]: (typeof LANGUAGES)[number]): void => {
    call.textContent = `z.config(z.locales.${code}())`;
    // Set the locale, parse, read the issues, restore: one synchronous block.
    const result = keepConfig(() => {
      z.config(localeConfig(code));
      return settle(SignUp.safeParse(INPUT));
    });
    check.show(INPUT, result);
    stage.say(`✗ ${plural(result.success ? 0 : result.error.issues.length, 'issue')}, worded in ${name}`, 'bad');
  };
  const at = stage.cycle(LANGUAGES, 2800, show);
  if (stage.bar) select(stage.bar, 'Language', LANGUAGES.map(([c, n], i) => [i, `${n} (${c})`] as const), (i) => at(i));
  return stage.dispose;
};

export default mount;
