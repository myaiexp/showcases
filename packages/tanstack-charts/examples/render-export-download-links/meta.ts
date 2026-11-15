// tanstack-charts example: Download buttons and prepared links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Download buttons and prepared links",
  summary:
    "Two ways to hand a chart to the reader. The buttons call downloadChartSvg and downloadChartImage, which download only when clicked. The prepared links are anchors with a download attribute whose blob URL was made ahead of time from serializeChartSvg and renderChartImage, so nothing downloads until the link is followed. Cards show the file sizes only.",
  section: "Exporting",
  tags: ['downloadChartSvg', 'downloadChartImage', 'serializeChartSvg', 'renderChartImage', 'download link'],
  docs: [
    'repo/docs/guides/exporting.md',
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
