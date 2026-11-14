// css-doodle example: @shape: built-in shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@shape: built-in shapes",
  summary:
    "The @shape property clips a cell to one of twenty-one named shapes. @p picks one of four for each cell, and a new seed redraws them.",
  section: "Properties",
  tags: ['@shape', '@p', 'clip-path'],
  docs: [
    'pages/css-doodle-com/reference/property-shape.md',
    'pages/css-doodle-com/reference/function-p.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
