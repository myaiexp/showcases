// Zod example: A tuple with a rest element: method, then paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A tuple with a rest element: method, then paths',
  summary:
    'A request line starts with an HTTP method and is followed by any number of paths. z.tuple([method], path) gives the first slot its own rule and applies the second schema to every extra item, so the issue names the path in position 2.',
  section: 'Arrays, tuples and unions',
  tags: ['z.tuple', 'rest', 'z.enum', 'startsWith'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
