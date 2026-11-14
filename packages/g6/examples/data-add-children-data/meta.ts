// g6 example: Data API: addChildrenData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data API: addChildrenData',
  summary:
    'addChildrenData(parentId, nodes) grows a tree: it adds the nodes, lists them on the parent and adds the edges. The layout then runs again.',
  section: 'Data',
  tags: ['addChildrenData', 'treeToGraphData', 'compact-box'],
  docs: [
    'repo/packages/site/docs/api/data.en.md',
    'repo/packages/site/common/manual/feature/treeToGraphData.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
