// leafer-ui example: Stroke sides: on a Box with children
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke sides: on a Box with children",
  summary:
    "Box takes the same array strokeWidth as Rect. The Box here holds a child, and with overflow \"hide\" the child is clipped to the inner edge of the thick top and bottom strokes.",
  section: 'Official plugins',
  tags: ["stroke-sides", "strokeWidth", "Box", "overflow"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/stroke-sides.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/stroke-sides/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
