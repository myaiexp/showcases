// leafer-ui example: Keyboard: isHold and isHoldSpaceKey
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Keyboard: isHold and isHoldSpaceKey",
  summary: "Keyboard.isHold(code) and Keyboard.isHoldSpaceKey() answer whether a key is down right now, from any listener. A readout polls them every frame; the card holds Space and Shift down through the interaction for a second at a time.",
  section: "Events",
  tags: ["Keyboard", "isHold", "isHoldSpaceKey", "KeyEvent"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Key.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
