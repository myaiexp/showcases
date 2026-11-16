// leafer-ui example: Hit: hitFill none leaves only the stroke responding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hit: hitFill none leaves only the stroke responding",
  summary: "hitFill: \"none\" makes the translucent fill ignore the pointer; only the stroke band still drags the Rect. The card tries the middle and then the stroke for each setting.",
  section: "Interaction",
  tags: ["hitFill","IHitType","stroke","draggable"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/hitFill.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/hitStroke.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
