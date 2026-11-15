// tanstack-charts example: Bandwidth and cell size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bandwidth and cell size",
  summary:
    "bandwidth is the width of the Gaussian kernel and cellSize the resolution of the estimation grid, both in final pixels. Narrow kernels follow individual points, wide ones merge clusters; a large cell size gives blocky outlines.",
  section: "Density Contour Mark",
  tags: ['densityContour', 'bandwidth', 'cellSize'],
  docs: ['repo/docs/reference/marks/density.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
