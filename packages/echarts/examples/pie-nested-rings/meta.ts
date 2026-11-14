// echarts example: Nested pie rings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested pie rings',
  summary:
    'Two pie series share a centre: an inner ring of three food groups and an outer ring of their members. Hover or click sectors, and toggle the borders between them.',
  section: 'Option: series.pie',
  tags: ['pie', 'radius', 'center', 'selectedMode', 'label.position'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/circular-layout.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
