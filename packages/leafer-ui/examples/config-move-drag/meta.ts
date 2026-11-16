// leafer-ui example: Config move: drag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config move: drag",
  summary:
    "move.drag: true is preview mode: any drag pans the view and the elements stop being draggable. \"auto\" keeps draggable elements draggable and pans only when the drag starts on empty space. The card drags a square, then empty space.",
  section: "App & engine config",
  tags: ['Leafer', 'move', 'drag', 'auto', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/move.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
