// The same addresses through four email patterns
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = [
  'ada@example.com',
  'ada@localhost',
  'ada..l@example.com',
  'josé@example.com',
  'ada@exämple.com',
  '用户@例子.广告',
  '"ada lovelace"@example.com',
  'a@b.c',
];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'default', code: 'z.email()  // the default pattern', schema: z.email() },
      { label: 'html5Email', code: 'z.email({ pattern: z.regexes.html5Email })', schema: z.email({ pattern: z.regexes.html5Email }) },
      { label: 'rfc5322Email', code: 'z.email({ pattern: z.regexes.rfc5322Email })', schema: z.email({ pattern: z.regexes.rfc5322Email }) },
      { label: 'unicodeEmail', code: 'z.email({ pattern: z.regexes.unicodeEmail })', schema: z.email({ pattern: z.regexes.unicodeEmail }) },
    ],
  });

export default mount;
