// observable-plot example: Dot: ordinal dot plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: ordinal dot plot',
  summary:
    'Age-group shares of each state population on an ordinal y, with color for age. normalizeX gives shares, groupY finds each state min and max for a rule, and selectMinX labels the rows.',
  section: 'Mark: Dot',
  tags: ['dot', 'normalizeX', 'groupY', 'selectMinX', 'ruleY', 'text'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/transforms/normalize.md', 'repo/docs/transforms/group.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
