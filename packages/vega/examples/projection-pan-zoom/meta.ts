// vega example: Projections: Pan and Zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: Pan and Zoom",
  summary:
    "Drag to pan a Mercator map by moving translate, turn the wheel to zoom by changing scale; the card plays both gestures.",
  section: "Projections",
  tags: ["projection.scale", "projection.translate", "signal.on", "event.wheel"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/signals.md", "repo/docs/docs/event-streams.md", "repo/docs/docs/expressions.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
