// leafer-ui example: Config pointer: hitRadius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: hitRadius",
  summary:
    "pointer.hitRadius (5 px by default) widens the pointer into a disc for hit testing, which makes thin things easier to catch. With 0 the pointer must be exactly over the shape. The ghost pointer waits 12 px outside the rect's edge.",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'hitRadius', 'PointerEvent'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
