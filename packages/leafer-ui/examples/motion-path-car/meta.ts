// leafer-ui example: Motion path: a car along a path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Motion path: a car along a path",
  summary:
    "A shape with motionPath: true becomes a road: other elements in its group can move along it. Animating the car's motion to { type: \"percent\", value: 1 } drives it from start to end; around: \"bottom\" keeps its wheels on the line.",
  section: "Fun",
  tags: ['Polygon', 'Path', 'motionPath', 'motion', 'animation', '@leafer-in/motion-path', '@leafer-in/animate'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/plugin/motion-path.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
