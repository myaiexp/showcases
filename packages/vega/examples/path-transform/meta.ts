// vega example: Path: Angle and Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path: Angle and Scale",
  summary:
    "The docs bow-tie path, positioned at x and y, then rotated by angle and stretched by scaleX and scaleY (scaling comes first, then rotation). Stroke cap and join show on its sharp corners.",
  section: "Mark Types",
  tags: ['marks.path.path','marks.path.angle','marks.path.scaleX','marks.path.scaleY','marks.path.strokeJoin'],
  docs: ['repo/docs/docs/marks/path.md', 'repo/docs/docs/marks/path.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
