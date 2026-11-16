// leafer-ui example: Config pointer: tapMore
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: tapMore",
  summary:
    "By default one gesture fires one of tap, double_tap and long_tap. tapMore: true lets them all fire together, so a double tap also reports its two taps. The counters show what arrived.",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'tapMore', 'PointerEvent', 'TAP', 'DOUBLE_TAP'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
