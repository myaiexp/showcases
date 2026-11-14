// observable-plot example: Normalize: age shares by state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Normalize: age shares by state',
  summary:
    'normalizeX with the sum basis and z set to state converts populations into each age group share of its state. A dot plot with a range rule and selectMinX labels compares the states.',
  section: 'Transform: Normalize',
  tags: ['dot', 'ruleY', 'text', 'normalizeX', 'sum', 'groupY', 'selectMinX'],
  docs: ['repo/docs/transforms/normalize.md', 'repo/docs/transforms/select.md', 'repo/docs/transforms/group.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
