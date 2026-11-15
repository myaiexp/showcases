// vega example: kde2d: cellSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "kde2d: cellSize",
  summary:
    "The density grid's resolution, cellSize 1 to 32: unsmoothed contours of coarse grids turn into blocks.",
  section: "Transforms: Geographic",
  tags: ["transform.kde2d.cellSize", "transform.isocontour.smooth"],
  docs: ["repo/docs/docs/transforms/kde2d.md", "repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/schemes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
