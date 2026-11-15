// Zod example: Coerce text and numbers into dates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coerce text and numbers into dates',
  summary:
    'z.coerce.date() runs new Date(input): ISO text and timestamps become real Date objects, nonsense is rejected. Not everything is strict: null quietly becomes the first instant of 1970.',
  section: 'Primitives and coercion',
  tags: ['z.coerce.date', 'z.date', 'coercion'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
