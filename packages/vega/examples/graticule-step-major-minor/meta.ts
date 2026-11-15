// vega example: Graticule: stepMajor and stepMinor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graticule: stepMajor and stepMinor",
  summary:
    "A globe whose graticule has separate major and minor spacings; the minor lines stop at 80 degrees of latitude and the major meridians go on to the pole.",
  section: "Transforms: Geographic",
  tags: ["transform.graticule", "transform.graticule.stepMajor", "transform.graticule.stepMinor"],
  docs: ["repo/docs/docs/transforms/graticule.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/projections.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
