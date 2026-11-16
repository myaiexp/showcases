// leafer-ui example: Editor config: editBox false hides the edit box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: editBox false hides the edit box",
  summary: "With editBox false the selection still works (the selected element is outlined) but the edit box with its handles is not shown, so the element cannot be edited by dragging handles.",
  section: 'Graphic editor',
  tags: ["Editor", "editBox", "select"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/select.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
