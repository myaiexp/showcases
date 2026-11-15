// vega example: Projections: fit and extent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: fit and extent",
  summary:
    "Fits a projection to a selected country inside a dashed extent box whose left margin and padding are sliders.",
  section: "Projections",
  tags: ["projection.fit", "projection.extent", "signal.bind"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/filter.md", "repo/docs/docs/marks/rect.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
