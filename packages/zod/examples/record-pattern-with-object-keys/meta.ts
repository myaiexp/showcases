// Zod example: an object intersected with a pattern record keeps its own keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A record only judges keys that match it',
  summary:
    'An object with a name plus any number of S_ prefixed settings, written as an intersection with a pattern-keyed record. Since Zod 4.5 the record only looks at keys matching its pattern, so the object own key name is no longer rejected.',
  section: 'Release notes',
  tags: ['z.record', 'z.intersection', '.and()', 'regex', 'invalid_key'],
  docs: ['repo/packages/docs/content/blog/zod-4-5.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
