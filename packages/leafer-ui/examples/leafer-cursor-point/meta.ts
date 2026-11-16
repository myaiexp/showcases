// leafer-ui example: Leafer: cursorPoint and client coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Leafer: cursorPoint and client coordinates",
  summary:
    "leafer.cursorPoint is the pointer in world coordinates, clientBounds is the canvas on the page, and getWorldPointByClient() turns a browser clientX/clientY into engine coordinates. All three are read live here.",
  section: "App & Engine",
  tags: ['Leafer', 'cursorPoint', 'clientBounds', 'getWorldPointByClient'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
