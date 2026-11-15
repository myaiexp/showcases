// vega example: Graticule: extent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graticule: extent",
  summary:
    "A graticule limited to a longitude and latitude box with the extent parameter, drawn over an equirectangular world; four sliders move the box.",
  section: "Transforms: Geographic",
  tags: ["transform.graticule", "transform.graticule.extent", "transform.graticule.step"],
  docs: ["repo/docs/docs/transforms/graticule.md", "repo/docs/docs/transforms/graticule.vg.json", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/projections.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
