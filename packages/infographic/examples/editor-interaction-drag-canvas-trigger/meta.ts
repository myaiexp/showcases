// AntV Infographic example: DragCanvas: choosing the trigger key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DragCanvas: choosing the trigger key",
  summary:
    "DragCanvas takes a trigger option, a list of key codes, and defaults to Space. The full view lets you pick Space, G or Alt and rebuilds the editor with it, so only the chosen key pans. The card cycles the three settings in its caption while the view pans.",
  section: "Editor",
  tags: ["DragCanvas", "DragCanvasOptions", "trigger", "KeyCode"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
