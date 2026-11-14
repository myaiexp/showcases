// css-doodle example: @shape morphing between two clip-paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@shape morphing between two clip-paths",
  summary:
    "Two shapes morph into each other when they have the same number of points. A circle is an ellipse(), so it is given 180 points with the @shape function first, then animates into a heart.",
  section: "Properties",
  tags: ['@shape', 'clip-path', '@keyframes'],
  docs: [
    'pages/css-doodle-com/reference/property-shape.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
