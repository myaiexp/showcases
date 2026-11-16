// leafer-ui example: Hit: hitChildren false makes the Group act as one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hit: hitChildren false makes the Group act as one",
  summary: "With hitChildren: false the children stop responding, so a drag on the green rect moves the whole Group instead of just the rect. The checkbox switches it.",
  section: "Interaction",
  tags: ["hitChildren","Group","draggable"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/hitChildren.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
