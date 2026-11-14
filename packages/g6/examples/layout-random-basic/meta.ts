// g6 example: Random layout: scatter and re-roll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Random layout: scatter and re-roll",
  summary: "The random layout drops each node at a random point inside the layout area, with no overlap checks. A button re-runs it, and sliders shrink the area (width, height).",
  section: 'Layout',
  tags: ["random", "width", "height", "center"],
  docs: [
    "repo/packages/site/docs/manual/layout/RandomLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
