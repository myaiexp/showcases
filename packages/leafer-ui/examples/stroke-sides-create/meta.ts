// leafer-ui example: Stroke sides: a Rect with a different stroke on each side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke sides: a Rect with a different stroke on each side",
  summary:
    "With @leafer-in/stroke-sides, Rect, Box and Frame take strokeWidth as four numbers [top, right, bottom, left]. This rounded Rect has 5, 0, 5 and 10; select it in the editor and resize it, the sides keep their widths.",
  section: 'Official plugins',
  tags: ["stroke-sides", "strokeWidth", "Rect", "cornerRadius", "editable"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/stroke-sides.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/stroke-sides/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
