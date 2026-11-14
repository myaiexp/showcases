// Zod example: z.json() accepts only JSON-safe values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'z.json() accepts only JSON-safe values',
  summary:
    'A JSON schema takes numbers, text, yes/no, null, lists and plain objects, nested to any depth. It rejects what JSON.stringify would lose or change: a date, undefined, a function, NaN and infinity.',
  section: 'Defaults, catch and more',
  tags: ['z.json'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
