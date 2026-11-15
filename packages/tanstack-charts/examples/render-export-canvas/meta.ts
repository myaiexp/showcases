// tanstack-charts example: Exporting a Canvas chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exporting a Canvas chart",
  summary:
    "A chart mounted with mountCanvasChart is exported with the same renderChartImage call, which draws the stable base bitmap at the requested scale. Beside it, the surface's own canvas.toDataURL() gives the raw base bitmap at the backing-store size. The readout compares their pixel sizes.",
  section: "Exporting",
  tags: ['renderChartImage', 'CanvasChartSurface.canvas', 'toDataURL', 'mountCanvasChart'],
  docs: ['repo/docs/guides/exporting.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
