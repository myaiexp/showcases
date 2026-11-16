// leafer-ui example: Layout: scaleOf with resize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: scaleOf with resize",
  summary:
    "The resize argument of scaleOf converts the scale into width and height: scaleOf(origin, 2, 2, true) leaves scaleX at 1 and the stroke thin. The checkbox flips it.",
  section: "Layout",
  tags: ["scaleOf","resize"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/resize.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
