// leafer-ui example: Editor config: resizeCursor draws the resize cursor from an SVG
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: resizeCursor draws the resize cursor from an SVG",
  summary: "resizeCursor is { url, x, y } where url is an SVG string; {{rotation}} is replaced by the handle angle, so one arrow serves all eight handles. Hovering a handle shows the cursor image in the corner tile.",
  section: 'Graphic editor',
  tags: ["Editor", "resizeCursor", "IImageCursor", "cursor"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/cursor.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
