// leafer-ui example: Editor config: editSize chooses what resizing changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: editSize chooses what resizing changes",
  summary: "With editSize 'size' (the default) a resize changes width and height, with 'scale' it changes scaleX and scaleY instead; the readout shows both after a corner drag.",
  section: 'Graphic editor',
  tags: ["Editor","editSize","resizeable","scale"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/base.md","pages/www-leaferjs-com/ui/en/plugin/in/editor.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
