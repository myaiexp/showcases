// Zod example: One error, four formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One error, four formats',
  summary:
    'The docs\' own failing player (a number for the username, a bad list entry and an extra key) is formatted by z.treeifyError, z.prettifyError, z.flattenError and z.formatError. Each answers a different need.',
  section: 'Formatting errors',
  tags: ['z.treeifyError', 'z.prettifyError', 'z.flattenError', 'z.formatError'],
  docs: ['repo/packages/docs/content/error-formatting.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
