// leafer-ui example: UI: move, moveInner, moveWorld
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI: move, moveInner, moveWorld",
  summary:
    "move(x, y) shifts an element in its parent's space, moveInner() in its own rotated inner space and moveWorld() in the canvas's space. The rect sits inside a group rotated by 30 degrees, so the three go different ways.",
  section: "Elements",
  tags: ['move', 'moveInner', 'moveWorld', 'UI'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/UI.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
