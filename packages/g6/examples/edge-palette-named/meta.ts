// g6 example: Edge palette by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edge palette by name',
  summary:
    'edge.palette set to a registered palette name; colours are handed out by edge id.',
  section: 'Edge',
  tags: ['edge.palette', 'tableau', 'spectral', 'oranges'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md',
    'repo/packages/site/docs/manual/theme/palette.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
