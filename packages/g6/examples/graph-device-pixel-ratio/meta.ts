// g6 example: Graph option devicePixelRatio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option devicePixelRatio',
  summary:
    'The canvas backing store grows with devicePixelRatio while the box stays the same size. The option is read once, so each choice rebuilds the graph.',
  section: 'Graph',
  tags: ['devicePixelRatio'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
