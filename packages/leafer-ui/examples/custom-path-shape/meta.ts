// leafer-ui example: Custom: a filled shape from path commands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: a filled shape from path commands",
  summary:
    "The same __updatePath() hook draws a closed shape, here an arrow head from moveTo, lineTo and closePath inside width and height. Fill, stroke and dragging work as on any element.",
  section: "Custom elements",
  tags: ['UI', '__updatePath', '__updateBoxBounds', 'PathCommandDataHelper', 'fill'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/path.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
