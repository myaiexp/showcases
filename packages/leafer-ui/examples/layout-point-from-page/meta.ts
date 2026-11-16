// leafer-ui example: Layout: points from page coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: points from page coordinates",
  summary:
    "getWorldPointByPage converts a page point (before the Leafer's own zoom) into a world point. The Leafer is zoomed so the two differ.",
  section: "Layout",
  tags: ["getWorldPointByPage"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/point.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
