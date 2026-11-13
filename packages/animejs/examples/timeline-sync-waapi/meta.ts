// animejs example: Timeline sync() with WAAPI animations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timeline sync() with WAAPI animations",
  summary: "Three native WAAPI animations are staggered on one timeline with sync() at 0, 350 and 250 ms; the timeline's currentTime is read out.",
  section: 'Timeline',
  tags: ["createTimeline", "sync", "waapi.animate"],
  docs: [
    "pages/animejs-com/documentation/timeline.md",
    "pages/animejs-com/documentation/timeline/sync-waapi-animations.md",
    "pages/animejs-com/documentation/timeline/timeline-methods/sync.md",
    "pages/animejs-com/documentation/timeline/timeline-playback-settings.md"
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
