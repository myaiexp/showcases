// Zod example: A CSV row as a tuple
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A CSV row as a tuple',
  summary:
    'A parsed CSV row is a list where position matters: name, age, subscribed. A tuple gives each column its own schema, so a row with the age in the wrong column is rejected and the issues point at columns 1 and 2.',
  section: 'Arrays, tuples and unions',
  tags: ['z.tuple', 'z.string', 'z.number', 'z.boolean'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
