// echarts example: Stacking mixed signs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacking mixed signs',
  summary:
    'Three stacked area lines whose values cross zero. Switch stackStrategy between samesign, all, positive and negative, and stackOrder between seriesAsc and seriesDesc, to see how each rule piles up the negatives.',
  section: 'Option: series.line',
  tags: ['stack', 'stackStrategy', 'stackOrder', 'areaStyle'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/stack.md', 'repo/en/option/partial/area-style.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
