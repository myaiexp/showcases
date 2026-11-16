// leafer-ui example: Hit: hitStroke path, none and all
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hit: hitStroke path, none and all",
  summary: "hitStroke decides whether the stroke takes the pointer. A wide outside stroke drags the Rect with \"path\", is ignored with \"none\", and responds with \"all\". The card grabs the stroke for each.",
  section: "Interaction",
  tags: ["hitStroke","IHitType","strokeAlign","draggable"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/hitStroke.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
