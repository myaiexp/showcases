// tanstack-charts example: includeFocus keeps the painted focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "includeFocus keeps the painted focus",
  summary:
    "A point is focused programmatically with the host's interaction controller, then the chart is serialized twice: by default, where focus decoration is left out, and with includeFocus: true, where the ring and crosshair that are painted at that moment stay in the file. The two images and string lengths are shown side by side.",
  section: "Exporting",
  tags: ['serializeChartSvg', 'includeFocus', 'setControlledFocus', 'crosshair'],
  docs: ['repo/docs/guides/exporting.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
