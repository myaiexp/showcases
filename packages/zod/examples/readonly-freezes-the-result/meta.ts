// Zod example: Readonly: the result cannot be changed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Readonly: the result cannot be changed',
  summary:
    'A parsed user comes back frozen. Trying to rename it, add a field or delete one throws a TypeError, and the user stays as it was. The same data parsed without .readonly() can be changed freely.',
  section: 'Defaults, catch and more',
  tags: ['readonly', 'Object.freeze'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
