// tanstack-charts example: PNG export at a chosen scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PNG export at a chosen scale",
  summary:
    "renderChartImage rasterizes the mounted chart into a PNG blob. scale sets pixel density without changing layout, so a scale of 2 produces an image twice as wide and tall with the same picture. The slider picks the scale; the readout reports the blob's type and size and the decoded image dimensions.",
  section: "Exporting",
  tags: ['renderChartImage', 'RenderChartImageOptions', 'scale', 'background', 'blob'],
  docs: ['repo/docs/guides/exporting.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
