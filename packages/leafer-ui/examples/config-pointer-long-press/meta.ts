// leafer-ui example: Config pointer: longPressTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: longPressTime",
  summary:
    "longPressTime (800 ms by default) is how long a press must last to fire long_press. The card holds a press for 600 ms, which is a long press only when the setting is shorter than that.",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'longPressTime', 'PointerEvent', 'LONG_PRESS'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
