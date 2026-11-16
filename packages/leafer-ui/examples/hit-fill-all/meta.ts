// leafer-ui example: Hit: hitFill all makes an invisible fill respond
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hit: hitFill all makes an invisible fill respond",
  summary: "A Rect with only a gradient stroke is hollow to the pointer by default (hitFill: \"path\" needs a visible fill). hitFill: \"all\" makes the whole interior draggable. The select switches it.",
  section: "Interaction",
  tags: ["hitFill","IHitType","stroke","draggable"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/hitFill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
