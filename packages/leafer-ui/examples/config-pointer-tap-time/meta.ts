// leafer-ui example: Config pointer: tapTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: tapTime",
  summary:
    "tapTime (120 ms by default) is how quickly the second tap of a double tap must follow the first. Shorten it and the same two taps count as two single taps. The card double-taps at a steady pace and cycles the setting.",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'tapTime', 'PointerEvent', 'DOUBLE_TAP'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
