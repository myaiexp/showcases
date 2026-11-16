// leafer-ui example: PointerEvent: menu and menu_tap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PointerEvent: menu and menu_tap",
  summary: "A right-button press fires pointer.menu (the contextmenu, on press) and its release fires pointer.menu_tap. The log shows which button was used; the card right-clicks the rect with the fake pointer.",
  section: "Events",
  tags: ["PointerEvent.MENU", "PointerEvent.MENU_TAP", "PointerButton"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Pointer.md", "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
