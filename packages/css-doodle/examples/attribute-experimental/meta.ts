// css-doodle example: The experimental attribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The experimental attribute",
  summary:
    "experimental raises the grid limit from 64 to 256 per axis: with it a 100x100 grid draws ten thousand cells, without it the grid is clamped to 64x64. The checkbox toggles the attribute.",
  section: "Attributes",
  tags: ['experimental', 'grid', '@R'],
  docs: [
    'pages/css-doodle-com/reference/attribute-experimental.md',
    'pages/css-doodle-com/reference/attribute-grid.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
