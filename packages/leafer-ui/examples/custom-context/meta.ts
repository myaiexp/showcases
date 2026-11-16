// leafer-ui example: Custom: draw with canvas.context
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: draw with canvas.context",
  summary:
    "Overriding __draw(canvas) draws with the raw 2D context (for wrapping other canvas code), while __updateBoxBounds() gives the bounds and __drawHitPath() the hit area. The half-filled, half-stroked box here can be dragged by its drawn area.",
  section: "Custom elements",
  tags: ['UI', '__draw', '__drawHitPath', '__updateBoxBounds', 'setStrokeOptions'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/context.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
