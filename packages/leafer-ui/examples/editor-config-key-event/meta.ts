// leafer-ui example: Editor config: keyEvent turns arrow-key movement on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: keyEvent turns arrow-key movement on and off",
  summary: "With keyEvent true the arrow keys nudge the selection; false makes the editor ignore the keyboard. The card presses the right arrow through the ghost.",
  section: 'Graphic editor',
  tags: ["Editor", "keyEvent", "arrowStep", "KeyEvent"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
