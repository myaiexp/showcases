// g6 example: Force layout: getCenter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: getCenter",
  summary: "getCenter returns a point and a strength for each node, adding a centripetal force toward that point. Here every cluster is pulled to its own corner of the canvas; the camera stays fixed.",
  section: 'Layout',
  tags: ["force", "getCenter", "centripetalOptions"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
