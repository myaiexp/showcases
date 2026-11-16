// leafer-ui example: Viewport: what "viewport" is made of
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewport: what \"viewport\" is made of",
  summary:
    "The viewport type is a plain tree layer plus three config blocks (wheel, touch and pointer: stop the browser's defaults) and two listeners that move and scale the zoom layer. This builds that by hand on an App.",
  section: "Advanced",
  tags: ['App', 'wheel', 'touch', 'pointer', 'MoveEvent', 'ZoomEvent', 'zoomLayer', '@leafer-in/viewport'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/viewport.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
