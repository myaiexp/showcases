// leafer-ui example: Config pointer: through
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: through",
  summary:
    "pointer.through: true adds throughPath to pointer events: the whole stack of elements under the pointer, topmost last, even those covered by others. Two rects overlap; pressing the top one lists both.",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'through', 'throughPath', 'PointerEvent'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
