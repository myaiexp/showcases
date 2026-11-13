// animejs example: Timeline init(): render initial states early
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timeline init(): render initial states early",
  summary: "Builds a paused timeline of x-from animations with and without init(), so you can see the shapes sit at their from state only when init() ran.",
  section: 'Timeline',
  tags: ["createTimeline", "init", "from", "autoplay"],
  docs: [
    "pages/animejs-com/documentation/timeline.md",
    "pages/animejs-com/documentation/timeline/timeline-methods.md",
    "pages/animejs-com/documentation/timeline/timeline-methods/init.md"
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
