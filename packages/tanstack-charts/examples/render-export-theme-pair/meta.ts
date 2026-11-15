// tanstack-charts example: Export with the theme meant for the file
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Export with the theme meant for the file",
  summary:
    "A chart that follows the page's dark mode is the wrong artifact for a printed document. The same definition is compiled twice with an explicit dark theme and an explicit light theme, each serialized with renderChartSvg and shown as an image, so the files do not depend on the page they were made on.",
  section: "Exporting",
  tags: ['defineChart', 'theme', 'createChartScene', 'renderChartSvg', 'background'],
  docs: [
    'repo/docs/guides/exporting.md',
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
