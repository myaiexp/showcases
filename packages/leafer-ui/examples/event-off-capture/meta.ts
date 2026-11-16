// leafer-ui example: Events: off() must match the capture flag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: off() must match the capture flag",
  summary: "A listener added with capture true is a different registration from the same function added without it, and off() needs the same flag to remove it. Pick a call: the log shows which of the two listeners survived.",
  section: "Interaction",
  tags: ["off","capture","on","PointerEvent"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/event/flow.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/off.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
