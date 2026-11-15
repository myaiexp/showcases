// tanstack-charts example: Computed styles are inlined on export
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Computed styles are inlined on export",
  summary:
    "A mounted chart draws text and lines in currentColor and CSS variables, which only mean something inside the page. serializeChartSvg resolves them to concrete colors so the file renders anywhere. The readout counts currentColor and var( occurrences in the mounted markup against the serialized markup.",
  section: "Exporting",
  tags: ['serializeChartSvg', 'currentColor', 'CSS variables', 'computed style'],
  docs: ['repo/docs/guides/exporting.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
