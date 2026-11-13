// Live form validation example metadata for the zod package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live form validation',
  summary:
    'Every keystroke runs the input through a Zod schema with safeParse. Fields turn red with a precise message or green when they pass, and the success card shows the parsed output, with age coerced to a real number.',
  section: 'Basics',
  tags: ['safeParse', 'coerce', 'forms'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
