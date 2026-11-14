// g6 example: Quick start: a force-directed graph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quick start: a force-directed graph',
  summary:
    'The Quick Start page in full: load a dataset, size every node at 10, colour nodes by a data field with the tableau palette, lay them out with d3-force, and drag, pan and zoom.',
  section: 'Getting Started',
  tags: ['Graph', 'render', 'autoFit', 'd3-force', 'palette', 'drag-canvas', 'zoom-canvas', 'drag-element'],
  docs: [
    'repo/packages/site/docs/manual/getting-started/quick-start.en.md',
    'repo/packages/site/common/manual/getting-started/quick-start/simple-graph.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
