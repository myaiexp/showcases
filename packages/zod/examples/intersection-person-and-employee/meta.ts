// Zod example: Intersection: data that fits both schemas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intersection: data that fits both schemas',
  summary:
    'z.intersection() (also .and()) requires the value to satisfy two schemas at once. A person with a name and a work role passes; leave out either part and the issue comes from the schema that failed, while the output merges both sides.',
  section: 'Arrays, tuples and unions',
  tags: ['z.intersection', 'z.object', 'issues'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
