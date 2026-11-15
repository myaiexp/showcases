// vega example: Projections: rotate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: rotate",
  summary:
    "An orthographic globe spinning about its vertical axis; yaw, pitch and roll sliders drive the three rotate angles.",
  section: "Projections",
  tags: ["projection.rotate", "projection.type"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
