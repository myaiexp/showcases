// g6 example: Graph option layout: object or pipeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option layout: object or pipeline',
  summary:
    'layout as one object lays out all nodes one way; as an array, each layout takes the nodes its nodeFilter accepts, here a ring for one group and a grid for the other.',
  section: 'Graph',
  tags: ['layout', 'layout.nodeFilter', 'circular', 'grid', 'layout()'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
    'repo/packages/site/docs/manual/layout/BaseLayout.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
