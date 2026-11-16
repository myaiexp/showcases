// leafer-ui example: UI: coordinate conversion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI: coordinate conversion",
  summary:
    "The pointer position arrives in world coordinates; getInnerPoint() and getBoxPoint() convert it into an element's own space, so a point over a rotated, scaled rect reads as the same spot on its face. The caption shows all three.",
  section: "Elements",
  tags: ['getInnerPoint', 'getBoxPoint', 'getLocalPoint', 'PointerEvent'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/UI.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
