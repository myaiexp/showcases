// Zod example: parse() guards a program from malformed incoming data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Guard a program from bad data',
  summary:
    'Messages arrive from outside: an API, a file, a form. The program greets each user by name, but only after User.parse() lets the data through. Good data reaches the greeting; a missing or wrong name throws a ZodError before the code that would have crashed or printed "Hello, undefined" ever runs.',
  section: 'Intro',
  tags: ['parse', 'z.object', 'ZodError', 'untrusted input'],
  docs: ['repo/packages/docs/content/index.mdx', 'repo/packages/docs/content/basics.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
