// g6 example: Edge palette by group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edge palette by group',
  summary:
    'edge.palette with type group and field direction: edges of the same direction share a colour, with a select for the colour pair.',
  section: 'Edge',
  tags: ['edge.palette', 'group', 'field', 'color'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md',
    'repo/packages/site/docs/manual/theme/palette.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
