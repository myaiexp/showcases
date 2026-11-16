// leafer-ui example: Robot: an action as { keyframes, loop, FPS }
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Robot: an action as { keyframes, loop, FPS }",
  summary:
    "An action can be an object with its own keyframes, loop and FPS that override the Robot's: one arrow plays slowly once, the other quickly forever.",
  section: "Official plugins",
  tags: ["Robot", "@leafer-in/robot", "actions", "IRobotAnimation", "FPS", "loop"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/robot.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
