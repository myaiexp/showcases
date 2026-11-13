// echarts example: Stacking negative values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacking negative values',
  summary:
    'Four series with positive and negative values sharing one stack. Switch stackStrategy between samesign, all, positive and negative, and stackOrder between ascending and reversed.',
  section: 'Option: series.bar',
  tags: ['bar', 'stack', 'stackStrategy', 'stackOrder', 'emphasis.focus'],
  docs: ['repo/en/option/series/bar.md', 'repo/en/option/partial/stack.md', 'repo/en/option/partial/emphasis-common.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
