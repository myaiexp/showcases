// vega example: kde2d: bandwidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "kde2d: bandwidth",
  summary:
    "The kernel bandwidth of a two-dimensional density estimate, set separately in x and y: small values give noisy contours, large ones merge the two clusters.",
  section: "Transforms: Geographic",
  tags: ["transform.kde2d", "transform.kde2d.bandwidth", "transform.isocontour"],
  docs: ["repo/docs/docs/transforms/kde2d.md", "repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/schemes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
