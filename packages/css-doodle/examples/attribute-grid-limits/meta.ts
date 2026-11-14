// css-doodle example: The grid attribute: limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The grid attribute: limits",
  summary:
    "Each axis is capped at 64, or 256 with the experimental attribute, and larger values are clamped. When one axis is 1 the other may go up to 4096. Type a grid value and read back the grid css-doodle used.",
  section: "Attributes",
  tags: ['grid', 'limits', 'experimental', 'grid (JS)'],
  docs: [
    'pages/css-doodle-com/reference/attribute-grid.md',
    'pages/css-doodle-com/reference/attribute-experimental.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
