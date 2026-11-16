// leafer-ui example: Events: emit a pointer event without a pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: emit a pointer event without a pointer",
  summary: "emit(\"pointer.enter\", { current: rect }) runs the element's own pointer.enter listeners, as in the docs' simulate-UI-events block. Buttons (and the card's timer) fire enter and leave by hand.",
  section: "Interaction",
  tags: ["emit","pointer.enter","on","PointerEvent"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/emit.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/on.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
