// vega example: Graticule: precision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graticule: precision",
  summary:
    "The graticule's own precision, the angular spacing of its points: from fine curves to coarse straight chords on a globe with projection resampling turned off.",
  section: "Transforms: Geographic",
  tags: ["transform.graticule", "transform.graticule.precision", "projection.precision"],
  docs: ["repo/docs/docs/transforms/graticule.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/projections.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
