// leafer-ui example: Editor: cancel() drops the selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: cancel() drops the selection",
  summary: "Select both rects with select(), then call app.editor.cancel(): the edit box goes away and list is empty again.",
  section: 'Graphic editor',
  tags: ["Editor","cancel","select","list"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/select.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
