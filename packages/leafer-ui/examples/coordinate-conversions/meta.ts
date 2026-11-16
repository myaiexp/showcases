// leafer-ui example: Coordinates: world, page, local, inner and box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Coordinates: world, page, local, inner and box",
  summary:
    "One pointer position in five coordinate systems. A rect sits inside a rotated and scaled Group on a zoomable view; the readout lists the same point as world, page, local, inner and box coordinates, and the red dot is placed from the page point.",
  section: "Advanced",
  tags: ['Leafer', 'getPagePoint', 'getLocalPoint', 'getInnerPoint', 'getBoxPoint', 'PointerEvent', 'type', 'viewport'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/coordinate.md', 'pages/www-leaferjs-com/ui/en/guide/basic/display.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
