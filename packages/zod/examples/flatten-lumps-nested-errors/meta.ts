// Zod example: What flattenError does to nested errors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What flattenError does to nested errors',
  summary:
    'flattenError keeps one list per top-level key. For nested data the errors of user.name and user.email land together under user, and tags[1] under tags, while the tree keeps every level.',
  section: 'Formatting errors',
  tags: ['z.flattenError', 'z.treeifyError', 'fieldErrors', 'z.object'],
  docs: ['repo/packages/docs/content/error-formatting.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
