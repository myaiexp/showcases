// Zod example: Holes in a treeified array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Holes in a treeified array',
  summary:
    'In the items list of a treeified error, elements that passed are undefined, so the list can be shorter than the data and has gaps. Reading .errors without ?. would throw, which is the pattern the docs warn about.',
  section: 'Formatting errors',
  tags: ['z.treeifyError', 'items', 'optional chaining', 'z.array'],
  docs: ['repo/packages/docs/content/error-formatting.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
