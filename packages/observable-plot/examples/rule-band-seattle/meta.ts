// observable-plot example: Rule: a band from daily rules
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rule: a band from daily rules',
  summary:
    'Seattle daily temperature as one ruleX per day, spanning y1 = temp_min to y2 = temp_max and stroked by temp_min on a BuRd scheme.',
  section: 'Mark: Rule',
  tags: ['ruleX', 'y1', 'y2', 'stroke', 'BuRd'],
  docs: ['repo/docs/marks/rule.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
