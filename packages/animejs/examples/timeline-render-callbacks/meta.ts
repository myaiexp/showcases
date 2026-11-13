// animejs example: Timeline onBeforeUpdate vs onRender counts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timeline onBeforeUpdate vs onRender counts",
  summary: "Two counters on a looping timeline with a loopDelay: onBeforeUpdate keeps counting while onRender pauses whenever nothing is rendered.",
  section: 'Timeline',
  tags: ["createTimeline", "onBeforeUpdate", "onRender", "loopDelay"],
  docs: [
    "pages/animejs-com/documentation/timeline.md",
    "pages/animejs-com/documentation/timeline/timeline-callbacks/onbeforeupdate.md",
    "pages/animejs-com/documentation/timeline/timeline-callbacks/onrender.md"
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
