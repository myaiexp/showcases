// animejs example: Stagger as a timeline position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stagger as a timeline position",
  summary: "stagger() passed as the position of a timeline add(): each target lands at its own start time, and the staggered onComplete fires for every target. A slider sets the step.",
  section: 'Utilities',
  tags: ["stagger", "createTimeline", "add", "label", "position"],
  docs: [
    "pages/animejs-com/documentation/timeline.md",
    "pages/animejs-com/documentation/utilities/stagger/timeline-positions-staggering.md"
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
