// leafer-ui example: Viewport: type "custom"
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewport: type \"custom\"",
  summary:
    "type: \"custom\" keeps the viewport events but leaves the handling to you: here BEFORE_MOVE and BEFORE_ZOOM listeners move and scale leafer.zoomLayer themselves, with getValidMove / getValidScale applying the limits.",
  section: "Advanced",
  tags: ['Leafer', 'type', 'custom', 'MoveEvent', 'ZoomEvent', 'zoomLayer', 'getValidMove', 'getValidScale'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/viewport.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
