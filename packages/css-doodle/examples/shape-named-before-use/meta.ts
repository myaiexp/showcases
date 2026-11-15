// css-doodle example: Using an #id before it is defined
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Using an #id before it is defined",
  summary:
    "An #id may come before the shape that defines it, and the last definition wins. Two uses of #tri come first and the polygon they refer to is defined at the bottom, one copy turned upside down.",
  section: 'Shapes',
  tags: ['@shape', '#id', 'polygon', 'union'],
  docs: ['pages/css-doodle-com/reference/function-shape.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
