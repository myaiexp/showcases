// observable-plot example: Tree transform: named node values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tree transform: named node values',
  summary:
    'The text beside each node can come from named node values such as node:name, node:path, node:depth, node:height and node:internal. Link color uses node:depth.',
  section: 'Transform: Tree',
  tags: ['treeLink', 'treeNode', 'text'],
  docs: ['repo/docs/transforms/tree.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
