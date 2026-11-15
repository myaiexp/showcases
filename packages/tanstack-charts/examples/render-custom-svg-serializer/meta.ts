// tanstack-charts example: A custom SVG serializer through renderSvg
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom SVG serializer through renderSvg",
  summary:
    "The vanilla host accepts renderSvg, a function from scene and options to markup. This one calls renderChartSvg and appends a keyed watermark text, so the data-ts-key reconciliation, the accessible name and the tooltip keep working. The checkbox switches back to the default serializer.",
  section: "Custom Marks and Renderers",
  tags: ['renderSvg', 'ChartSvgRenderer', 'renderChartSvg', 'data-ts-key'],
  docs: ['repo/docs/guides/custom-marks-and-renderers.md', 'repo/docs/reference/custom-extensions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
