// Perspective example: Throttle, auto-pause and render stats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Throttle, auto-pause and render stats",
  summary:
    "A scatter fed 200 updates a second. getRenderStats() reports frame rates each second, setThrottle() caps redraws, and setAutoPause() decides whether a hidden viewer keeps rendering.",
  section: "Viewer",
  tags: ["setThrottle", "setAutoPause", "getRenderStats", "streaming", "Y Scatter"],
  docs: ["repo/docs/md/how_to/javascript/viewer.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
