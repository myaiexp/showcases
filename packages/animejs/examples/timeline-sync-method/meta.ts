// animejs example: Timeline sync(): nested animations and timelines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timeline sync(): nested animations and timelines",
  summary: "A WAAPI animation, a child timeline and a second child timeline are all sync()ed into one main timeline, whose currentTime is read out.",
  section: 'Timeline',
  tags: ["createTimeline", "sync", "waapi", "nesting"],
  docs: [
    "pages/animejs-com/documentation/timeline.md",
    "pages/animejs-com/documentation/timeline/timeline-methods.md",
    "pages/animejs-com/documentation/timeline/timeline-methods/sync.md"
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
