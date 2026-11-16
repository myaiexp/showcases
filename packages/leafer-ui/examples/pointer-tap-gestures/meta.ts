// leafer-ui example: PointerEvent: tap, double tap and long press
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PointerEvent: tap, double tap and long press",
  summary: "tap, double_tap, long_press and long_tap are composite events built from down and up timing. By default only the most fitting one fires per gesture. The card performs a tap, a double tap and a long press in turn.",
  section: "Events",
  tags: ["PointerEvent.TAP", "PointerEvent.DOUBLE_TAP", "PointerEvent.LONG_PRESS", "PointerEvent.LONG_TAP"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Pointer.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
