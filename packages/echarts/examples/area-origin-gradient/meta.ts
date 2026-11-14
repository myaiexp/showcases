// echarts example: Area origin and gradient fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area origin and gradient fill',
  summary:
    'A line that crosses zero, filled with areaStyle. Choose where the fill starts with origin (auto, start, end or a number from the slider) and switch the fill between a flat colour and a linear gradient.',
  section: 'Option: series.line',
  tags: ['areaStyle', 'origin', 'color', 'linear gradient', 'opacity'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/area-style.md', 'repo/en/option/option.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
