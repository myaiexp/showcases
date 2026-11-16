// leafer-ui example: Editor: toTop() raises the selection above its siblings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: toTop() raises the selection above its siblings",
  summary: "The orange rect lies under the yellow one; app.editor.toTop() moves it to the top of its parent's children.",
  section: 'Graphic editor',
  tags: ["Editor","toTop","zIndex"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/zIndex.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
