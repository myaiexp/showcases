// g6 example: Graph option background and image export
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option background and image export',
  summary:
    'background colours the canvas and the exported picture. A selector rebuilds the graph with another colour and toDataURL() shows the export.',
  section: 'Graph',
  tags: ['background', 'toDataURL'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
