// vega example: Projections: Drag to Rotate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: Drag to Rotate",
  summary:
    "Drag an orthographic globe to turn it: pointer movement feeds the rotate longitude and latitude signals; a slider sets the scale.",
  section: "Projections",
  tags: ["projection.rotate", "signal.on", "signal.bind"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/signals.md", "repo/docs/docs/event-streams.md", "repo/docs/docs/expressions.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
