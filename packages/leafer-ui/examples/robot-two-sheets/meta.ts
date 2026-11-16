// leafer-ui example: Robot: a list of sheets makes one frame sequence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Robot: a list of sheets makes one frame sequence",
  summary:
    "robot also takes an array: each entry adds its frames after the previous ones. Two slices of the sheet (up arrows, then down arrows) become frames 0-4 and 5-9.",
  section: "Official plugins",
  tags: ["Robot", "@leafer-in/robot", "robot", "actions"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/robot.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
