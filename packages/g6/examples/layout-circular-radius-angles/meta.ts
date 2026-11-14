// g6 example: Circular layout: radius, startAngle, endAngle and angleRatio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circular layout: radius, startAngle, endAngle and angleRatio",
  summary: "radius fixes the ring size, startAngle and endAngle limit it to an arc, and angleRatio sets how many full turns lie between the first and last node. Sliders change each.",
  section: 'Layout',
  tags: ["circular", "radius", "startAngle", "endAngle", "angleRatio"],
  docs: [
    "repo/packages/site/docs/manual/layout/CircularLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
