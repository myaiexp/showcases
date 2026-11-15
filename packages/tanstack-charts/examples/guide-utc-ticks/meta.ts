// tanstack-charts example: Compact UTC scale ticks by span
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compact UTC scale ticks by span',
  summary:
    'The compact scaleUtc picks calendar-aware ticks: seconds, minutes, hours, days, weeks, months, quarters or years, depending on the span. Move the span slider from two hours to five years and the axis changes unit while the label format follows. Counts are hints, not exact.',
  section: 'Scales, Guides, and Color',
  tags: ['scaleUtc', 'ticks', 'tickFormat', 'nice', 'calendar ticks'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
