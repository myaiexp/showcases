// vega example: Shape: Countries from geoshape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: Countries from geoshape",
  summary:
    "Country outlines and a graticule drawn by shape marks, each with a geoshape transform on the mark. A projection with signal-driven type and rotation turns the globe; the card spins it.",
  section: "Mark Types",
  tags: ['marks.shape','transform.geoshape','projections.rotate','projections.type'],
  docs: ['repo/docs/docs/marks/shape.md', 'repo/docs/docs/transforms/geoshape.md', 'repo/docs/docs/transforms/geoshape.vg.json', 'repo/docs/docs/transforms/graticule.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
