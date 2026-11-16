// leafer-ui example: Editor: the element proxy takes layout properties for a multiple selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: the element proxy takes layout properties for a multiple selection",
  summary: "The docs note that the layout and transform methods of editor.element can drive the edit box: with two rects selected, element is a proxy, and changing its x and y moves the whole selection.",
  section: 'Graphic editor',
  tags: ["Editor", "element", "simulateTarget", "x", "y"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
