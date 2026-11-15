// tanstack-charts example: Raster background: transparent or opaque
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raster background: transparent or opaque",
  summary:
    "renderChartImage leaves the image transparent unless it is given a background. The select picks none, white or a dark fill, and the result is shown on a checkerboard so transparency is visible. The readout decodes the exported PNG and reports the alpha of its top-left pixel.",
  section: "Exporting",
  tags: ['renderChartImage', 'background', 'alpha', 'PNG'],
  docs: [
    'repo/docs/guides/exporting.md',
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
