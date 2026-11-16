// leafer-ui example: Config pointer: dragDistance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: dragDistance",
  summary:
    "pointer.dragDistance (2 px) is how far the pointer must move after pressing before a drag begins, so a shaky click is not a drag. Raise it and short drags no longer move the square. The ghost drags 14 px.",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'dragDistance', 'draggable'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
