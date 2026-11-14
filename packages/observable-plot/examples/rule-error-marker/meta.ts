// observable-plot example: Rule: error bars with markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rule: error bars with markers',
  summary:
    'Rules from 90% to 110% of each bar\'s height act as error bars; the marker option caps both ends and the select swaps the marker shape.',
  section: 'Mark: Rule',
  tags: ['ruleX', 'marker', 'y1', 'y2', 'barY'],
  docs: ['repo/docs/marks/rule.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
