// leafer-ui example: Editor config: mask darkens everything but the selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: mask darkens everything but the selection",
  summary: "mask true (or a colour string) lays a translucent overlay over the layer and leaves the selected element lit, which suits cropping and screenshot tools.",
  section: 'Graphic editor',
  tags: ["Editor", "mask", "editMask"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/style.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
