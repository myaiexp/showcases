// vega example: Isocontour: nice and zero
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Isocontour: nice and zero",
  summary:
    "Five levels of a density with checkboxes for nice (round threshold values) and zero (include the baseline), and a list of the resulting level values.",
  section: "Transforms: Geographic",
  tags: ["transform.isocontour.nice", "transform.isocontour.zero", "transform.isocontour.levels", "transform.window"],
  docs: ["repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/kde2d.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/formula.md", "repo/docs/docs/transforms/window.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/marks/text.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
