// leafer-ui example: Style: initial style in the constructor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Style: initial style in the constructor",
  summary:
    "Styles go into the constructor data. This Rect has only a stroke, 2 px wide, with dashPattern [6, 6] making it dashed; the card slides the dashes with dashOffset.",
  section: "Basics",
  tags: ['Rect', 'stroke', 'strokeWidth', 'dashPattern', 'dashOffset'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/style.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
