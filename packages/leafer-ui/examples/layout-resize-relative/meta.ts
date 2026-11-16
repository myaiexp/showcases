// leafer-ui example: Layout: resize in another coordinate system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: resize in another coordinate system",
  summary:
    "resizeWidth(width, relative) takes the width in 'inner', 'local', 'world' or 'page' units. The rect sits in a group scaled 2, so the same number gives different sizes.",
  section: "Layout",
  tags: ["resizeWidth","relative","ILocationType"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/resize.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
