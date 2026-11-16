// leafer-ui example: Debug: showBounds and hit areas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Debug: showBounds and hit areas",
  summary: "Debug.showBounds = true draws a wireframe around every element's bounds and 'hit' shows the interactive areas. The flag is page-wide, so the full view sets it only while it is open; the card draws the same kind of wireframes locally.",
  section: "Utilities",
  tags: ["Debug", "showBounds", "hit"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/debug/basic.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
