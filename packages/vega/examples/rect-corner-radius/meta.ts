// vega example: Rect: Corner Radius, Each Corner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rect: Corner Radius, Each Corner",
  summary:
    "Two rects: the left one rounds all corners with cornerRadius, the right sets the four corner radii separately and falls back to cornerRadius for any it leaves out.",
  section: "Mark Types",
  tags: ['marks.rect.cornerRadius','marks.rect.cornerRadiusTopLeft','marks.rect.cornerRadiusBottomRight'],
  docs: ['repo/docs/docs/marks/rect.md', 'repo/docs/docs/marks/rect.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
