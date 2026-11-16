// leafer-ui example: Rect: a radius per corner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rect: a radius per corner",
  summary:
    "cornerRadius takes an array: [topLeft, topRight, bottomRight, bottomLeft]. Each corner of the docs' [0, 40, 20, 40] rectangle is driven by its own slider.",
  section: "Elements",
  tags: ['Rect', 'cornerRadius', 'IFourNumber'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Rect.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/math/Math.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
