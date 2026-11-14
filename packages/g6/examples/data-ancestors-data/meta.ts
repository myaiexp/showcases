// g6 example: Data API: getAncestorsData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data API: getAncestorsData',
  summary:
    'Click a node or combo: its ancestors, from parent up to the root, are highlighted and listed. A selector switches between the tree and the combo hierarchy.',
  section: 'Data',
  tags: ['getAncestorsData', 'hierarchy', 'treeToGraphData', 'compact-box'],
  docs: [
    'repo/packages/site/docs/api/data.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
