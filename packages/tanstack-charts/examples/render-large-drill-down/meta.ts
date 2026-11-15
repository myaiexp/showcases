// tanstack-charts example: Focus the aggregate, drill down to rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Focus the aggregate, drill down to rows",
  summary:
    "A grid of aggregate cells covers 12,000 rows. Hovering a cell shows its count in the tooltip, and clicking selects it and lists the first few original rows inside that cell in a table below the chart. The chart keeps the density meaning while exact values stay available outside hover-only UI.",
  section: "Large Data",
  tags: ['rect', 'onSelect', 'tooltip', 'drill-down', 'aggregation'],
  docs: ['repo/docs/guides/large-data.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
