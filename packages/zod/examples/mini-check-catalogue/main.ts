// Zod Mini checks (length, regex, prefix, range, size, tidy) on samples
import * as zm from 'zod/mini';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Pick a check: the list shows what it does to each value.',
    types: false,
    inTitle: 'Value',
    outTitle: 'Result',
    ms: 3200,
    variants: [
      {
        label: 'length',
        code: 'zm.string().check(zm.minLength(3), zm.maxLength(8))',
        schema: zm.string().check(zm.minLength(3), zm.maxLength(8)),
        inputs: ['ab', 'tuna', 'tuna-fish-pie'],
        say: 'minLength and maxLength bound the text between 3 and 8 characters',
      },
      {
        label: 'regex',
        code: 'zm.string().check(zm.regex(/^[A-Z]{3}-\\d{3}$/))',
        schema: zm.string().check(zm.regex(/^[A-Z]{3}-\d{3}$/)),
        inputs: ['ABC-123', 'abc-123', 'AB-1'],
        say: 'regex wants three capitals, a dash and three digits',
      },
      {
        label: 'startsWith',
        code: 'zm.string().check(zm.startsWith("https://"))',
        schema: zm.string().check(zm.startsWith('https://')),
        inputs: ['https://mase.fi', 'http://mase.fi', 'mase.fi'],
        say: 'startsWith accepts only secure links',
      },
      {
        label: 'range',
        code: 'zm.number().check(zm.gte(1), zm.lte(10), zm.multipleOf(0.5))',
        schema: zm.number().check(zm.gte(1), zm.lte(10), zm.multipleOf(0.5)),
        inputs: [4.5, 4.3, 0, 11],
        say: 'gte, lte and multipleOf make a rating from 1 to 10 in half steps',
      },
      {
        label: 'list size',
        code: 'zm.array(zm.string()).check(zm.minLength(1), zm.maxLength(3))',
        schema: zm.array(zm.string()).check(zm.minLength(1), zm.maxLength(3)),
        inputs: [[], ['red'], ['red', 'green', 'blue', 'pink']],
        say: 'On lists, minLength and maxLength count the items',
      },
      {
        label: 'tidy-up',
        code: 'zm.string().check(zm.trim(), zm.toLowerCase())',
        schema: zm.string().check(zm.trim(), zm.toLowerCase()),
        inputs: ['  Ana@Mail.IO ', 'BOB@MAIL.IO', 'cy@mail.io'],
        say: 'trim and toLowerCase never reject: they rewrite the value',
      },
    ],
  });

export default mount;
