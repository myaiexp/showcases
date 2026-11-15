// css-doodle example: Path subpaths are contours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path subpaths are contours",
  summary:
    "Each subpath of path data is a contour, so with fill-rule: evenodd the inner one cuts a hole. The button switches the rule off to show the nonzero fill.",
  section: 'Shapes',
  tags: ['@shape', 'path', 'fill-rule'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
