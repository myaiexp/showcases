// g6 example: Data: treeToGraphData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data: treeToGraphData',
  summary:
    'treeToGraphData() turns a nested { id, children } tree into nodes and edges, drawn with compact-box and cubic-vertical edges. A selector turns the layout direction.',
  section: 'Data',
  tags: ['treeToGraphData', 'compact-box', 'cubic-vertical'],
  docs: [
    'repo/packages/site/docs/manual/whats-new/feature.en.md',
    'repo/packages/site/common/manual/feature/treeToGraphData.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
