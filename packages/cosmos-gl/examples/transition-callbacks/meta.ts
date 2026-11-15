// cosmos-gl example: Transition callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transition callbacks",
  summary:
    "onTransitionStart fires once, onTransition fires on every frame with the eased progress, and onTransitionEnd says whether the move was interrupted. Start a second move while the first runs to see interrupted: true.",
  section: "Transitions",
  tags: ["onTransitionStart", "onTransition", "onTransitionEnd"],
  docs: ['repo/src/stories/configuration.mdx', 'repo/history/2026/2026-04-22-gpu-transitions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
