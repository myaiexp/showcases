// leafer-ui example: UIEvent: buttons and modifier keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UIEvent: buttons and modifier keys",
  summary: "Every interaction event carries buttons (a sum of 1, 2, 4...), left, middle, right and the shift, ctrl and alt flags. The log decodes each tap; the card taps with different buttons and modifiers.",
  section: "Events",
  tags: ["UIEvent", "buttons", "left", "middle", "right", "shiftKey", "ctrlKey", "altKey"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/UIEvent.md", "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
