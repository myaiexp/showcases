// leafer-ui example: PointerEvent: pointerType, pressure and tilt
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PointerEvent: pointerType, pressure and tilt",
  summary: "Pointer events report pointerType ('mouse', 'pen', 'touch'), pressure, width and height of the contact and pen tilt. The card feeds interaction.pointerDown pen data of rising pressure and a bar and the log show what arrives.",
  section: "Events",
  tags: ["PointerEvent", "pointerType", "pressure", "tiltX", "tiltY", "interaction.pointerDown"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Pointer.md", "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
