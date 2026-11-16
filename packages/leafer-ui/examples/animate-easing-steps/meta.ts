// leafer-ui example: Animate easing: steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animate easing: steps",
  summary: "easing: { name: 'steps', value: 4 } moves in four jumps; value: [4, 'round'] or [4, 'ceil'] picks how each step is rounded. The plot draws the staircase, the square hops along it.",
  section: "Animate plugin",
  tags: ["easing", "steps", "IStepsEasing", "animate", "AnimateEasing", "@leafer-in/animate"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/animate/options/easing.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
