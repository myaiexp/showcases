// cosmos-gl example: Transition easing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transition easing",
  summary:
    "transitionEasing shapes how a move speeds up and slows down. Pick any of the 16 easings, as the TransitionEasing enum or as its string, and watch the block move while a plot draws the progress onTransition reports.",
  section: "Transitions",
  tags: ["transitionEasing", "TransitionEasing", "onTransition", "setConfigPartial"],
  docs: [
    'repo/src/stories/configuration.mdx',
    'repo/history/2026/2026-04-22-gpu-transitions.md',
    'repo/src/stories/api-reference.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
