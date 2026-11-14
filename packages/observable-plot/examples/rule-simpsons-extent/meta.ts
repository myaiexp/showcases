// observable-plot example: Rule: ratings extent per season
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rule: ratings extent per season',
  summary:
    'ruleX with groupX min and max gives each season\'s rating range, drawn behind the episode dots and a red median line.',
  section: 'Mark: Rule',
  tags: ['ruleX', 'groupX', 'dot', 'lineY'],
  docs: ['repo/docs/marks/rule.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
