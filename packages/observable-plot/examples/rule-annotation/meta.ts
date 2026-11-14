// observable-plot example: Rule: annotation baselines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rule: annotation baselines',
  summary:
    'A ruleY with a literal array marks y = 0 on a line chart, or y = 1 once the series is normalised to its first value on a log scale.',
  section: 'Mark: Rule',
  tags: ['ruleY', 'normalizeY', 'log scale', 'tickFormat'],
  docs: ['repo/docs/marks/rule.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
