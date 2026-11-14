// A Zod Mini schema with no locale, English loaded, French loaded
import * as zm from 'zod/mini';
import type { Mount } from '@/types.ts';
import { noLocale, withLocale } from '../../shared/mini-locale.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const SignUp = zm.object({
  email: zm.email(),
  age: zm.number().check(zm.gte(18)),
});

const CODE = 'zm.object({ email: zm.email(), age: zm.number().check(zm.gte(18)) })';
const INPUTS = [{ email: 'ana@mail.io', age: 30 }, { email: 'ana-at-mail', age: 30 }, { email: 'ana@mail.io', age: 12 }, { email: 'ana@mail.io' }];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch the loaded locale: the ✓ and ✗ stay put, only the words change.',
    inputs: INPUTS,
    inTitle: 'Sign-up',
    outTitle: 'Result',
    noun: 'sign-ups',
    variants: [
      { label: 'No locale loaded', code: CODE, schema: noLocale(SignUp), say: 'Nothing loaded: every failure reads "Invalid input"' },
      { label: 'z.config(en())', code: `z.config(en())  // then ${CODE}`, schema: withLocale(SignUp, 'en'), say: 'With English loaded the same failures name what was wrong' },
      { label: 'z.config(fr())', code: `z.config(fr())  // then ${CODE}`, schema: withLocale(SignUp, 'fr'), say: 'Any locale works: the same failures, worded in French' },
    ],
  });

export default mount;
