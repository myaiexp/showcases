// Zod example: a nested order checked field by field, plus a refine on the total
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested JSON validator',
  summary:
    'An order with a customer, a list of line items and a total. Break something deep inside, like the quantity of the second item, and the issue names the exact spot (items[1].qty). A refine() checks that the total adds up and pins its complaint on total with the path option.',
  section: 'Refinements',
  tags: ['z.object', 'z.array', 'refine', 'path', 'issues'],
  docs: ['repo/packages/docs/content/api.mdx', 'repo/packages/docs/content/basics.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
