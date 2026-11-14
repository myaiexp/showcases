// g6 example: d3-force places unpositioned nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'd3-force places unpositioned nodes',
  summary:
    'Ten nodes with no position would all sit at (0, 0); layout: { type: "d3-force" } simulates attraction and repulsion until the star settles.',
  section: 'Getting Started',
  tags: ['layout', 'd3-force', 'Array.from'],
  docs: ['repo/packages/site/docs/manual/getting-started/step-by-step.en.md', 'repo/packages/site/common/manual/getting-started/step-by-step/layout.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
