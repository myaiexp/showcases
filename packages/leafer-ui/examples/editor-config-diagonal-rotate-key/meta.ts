// leafer-ui example: Editor config: diagonalRotateKey rotates around the opposite corner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: diagonalRotateKey rotates around the opposite corner",
  summary: "While rotating, the diagonalRotateKey hook (Shift by default) makes the pivot the diagonal corner; here Alt does, so Ctrl+Alt-dragging a corner swings the rect around the opposite corner.",
  section: 'Graphic editor',
  tags: ["Editor", "diagonalRotateKey", "altKey", "rotateKey"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
