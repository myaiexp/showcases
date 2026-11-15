// tanstack-charts example: Built-in color scale: domain and range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Built-in color scale: domain and range',
  summary:
    'With no color.scale, the chart builds an ordinal scale from color.domain and color.range. domain fixes the category order and which values count, and range replaces the theme palette. Reordering the domain moves the colors without changing a single data row, and the legend follows the domain.',
  section: 'Scales, Guides, and Color',
  tags: ['color.domain', 'color.range', 'colorLegend', 'built-in ordinal'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
