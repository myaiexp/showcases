// Zod example: a schema's _zod.def drawn as the tree a tool reads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A schema as a tree',
  summary:
    'Every Zod 4 schema carries a plain description of itself in _zod.def. Walking it gives the tree shown here: object fields, list elements, union options and the checks attached to each node. This is the view a code generator or form builder gets.',
  section: 'Zod Core',
  tags: ['z.core', '_zod.def', 'def.type', 'def.checks', 'z.core.$ZodType'],
  docs: ['repo/packages/docs/content/packages/core.mdx', 'repo/packages/docs/content/library-authors.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
