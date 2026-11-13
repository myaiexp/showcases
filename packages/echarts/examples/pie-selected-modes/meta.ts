// echarts example: Selection modes and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection modes and offset',
  summary:
    'Click sectors to select them. Switch selectedMode between multiple, single, series and off, change how far selected sectors slide out with selectedOffset, and toggle the select-state border.',
  section: 'Option: series.pie',
  tags: ['pie', 'selectedMode', 'selectedOffset', 'select', 'selected', 'toggleSelect'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/selected-mode.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
