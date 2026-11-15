// Zod example: Check one property of a value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Check one property of a value',
  summary:
    'z.property(name, schema) runs a schema on a single property of whatever is being checked. The same idea is used on a text (its length), on a list (its length) and on a URL (its protocol), and the issue is pinned to that property.',
  section: 'Records, maps, sets and more',
  tags: ['z.property', 'z.instanceof', 'z.string', 'z.literal'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
