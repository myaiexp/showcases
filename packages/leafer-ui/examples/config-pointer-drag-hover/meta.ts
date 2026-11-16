// leafer-ui example: Config pointer: dragHover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: dragHover",
  summary:
    "pointer.dragHover decides whether hover events (over, out, enter, leave) still fire while something is being dragged. The yellow rect is dragged across the green one, which lights up only with dragHover on.",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'dragHover', 'PointerEvent', 'draggable'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
