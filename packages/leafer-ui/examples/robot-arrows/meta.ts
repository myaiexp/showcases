// leafer-ui example: Robot: a sprite with actions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Robot: a sprite with actions",
  summary:
    "Robot plays frames from a sprite sheet: robot gives the sheet and the frame size, actions name frames (a number is a still frame, an array loops), and action picks one. Arrow keys drive it in the full view; the card steers it round a square.",
  section: "Fun",
  tags: ['Robot', 'robot', 'actions', 'action', 'KeyEvent', '@leafer-in/robot'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/plugin/robot.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
