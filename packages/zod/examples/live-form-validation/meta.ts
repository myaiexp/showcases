// Zod example: a sign-up form checked by one Zod schema on every keystroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live form validation',
  summary:
    'A sign-up form whose rules all live in one Zod schema. Every keystroke runs safeParse over the whole form; each issue lands on the field its path names, and once everything passes the output shows age turned from typed text into a real number.',
  section: 'Basic usage',
  tags: ['safeParse', 'z.object', 'z.coerce.number', 'z.email', 'optional', 'forms'],
  docs: ['repo/packages/docs/content/basics.mdx', 'repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
