// tanstack-charts example: serializeChartSvg of a mounted chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "serializeChartSvg of a mounted chart",
  summary:
    "A chart is mounted as usual, then serializeChartSvg clones its svg at an explicit width and height and returns standalone markup with the XML namespace. The result is shown as an image and its start as text. The size select picks the export dimensions, which are independent of the chart's own display size.",
  section: "Exporting",
  tags: ['serializeChartSvg', 'SerializeChartSvgOptions', 'width', 'height', 'xmlns'],
  docs: ['repo/docs/guides/exporting.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
