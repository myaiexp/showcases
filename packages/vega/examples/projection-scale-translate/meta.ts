// vega example: Projections: scale and translate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: scale and translate",
  summary:
    "Sliders for a projection's scale and translate: the map grows and moves while a cross marks the translate point.",
  section: "Projections",
  tags: ["projection.scale", "projection.translate"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/docs/marks/symbol.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
