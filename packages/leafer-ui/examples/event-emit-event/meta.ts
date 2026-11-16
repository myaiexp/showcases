// leafer-ui example: Events: emitEvent sends an event object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: emitEvent sends an event object",
  summary: "emitEvent(event) emits an event object whose current is bound to the element for you, unlike emit(type, data). The listener reads e.current and the payload; the button (or the card's timer) sends it.",
  section: "Interaction",
  tags: ["emitEvent","emit","on","IEvent"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/emit.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
