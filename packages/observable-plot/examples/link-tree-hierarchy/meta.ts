// observable-plot example: Link: tree links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link: tree links',
  summary:
    'A family tree from slash-separated paths. The treeLink transform feeds the link mark parent and child positions and sets the bump-x curve; treeNode places dots and labels.',
  section: 'Mark: Link',
  tags: ['link', 'treeLink', 'treeNode', 'dot', 'text', 'curve'],
  docs: ['repo/docs/marks/link.md', 'repo/docs/transforms/tree.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
