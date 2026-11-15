// tanstack-charts example: Legend label typography and paint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend label typography and paint',
  summary:
    'Legend labels take fontSize, fontWeight, fillOpacity, a format function and a fill that may be a function of the resolved item color. Passing fill: (series, { color }) => color paints each label in its swatch color. format rewrites the label text without touching the data.',
  section: 'Legends and Color',
  tags: ['colorLegendItems', 'label', 'fontSize', 'fontWeight', 'fill', 'format'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
