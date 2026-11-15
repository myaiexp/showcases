// vega example: Graticule: step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graticule: step",
  summary:
    "The step parameter sets meridian and parallel spacing in degrees on an Equal Earth map; two sliders change longitude and latitude steps.",
  section: "Transforms: Geographic",
  tags: ["transform.graticule", "transform.graticule.step"],
  docs: ["repo/docs/docs/transforms/graticule.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/projections.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
