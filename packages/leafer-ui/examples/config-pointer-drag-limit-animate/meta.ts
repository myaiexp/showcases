// leafer-ui example: Config pointer: dragLimitAnimate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: dragLimitAnimate",
  summary:
    "With dragBounds an element cannot leave its limit. By default it is held there live; dragLimitAnimate lets it follow the pointer freely and then slide back into bounds when released (true uses speed 0.3, 0.1 to 0.9 sets it).",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'dragLimitAnimate', 'dragBounds', 'draggable', 'Frame'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
