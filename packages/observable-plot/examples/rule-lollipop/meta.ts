// observable-plot example: Rule: lollipop chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rule: lollipop chart',
  summary:
    'A ruleX with y and markerEnd: dot is a skinny bar topped by a dot; the toggle turns it sideways with ruleY.',
  section: 'Mark: Rule',
  tags: ['ruleX', 'ruleY', 'markerEnd', 'strokeWidth'],
  docs: ['repo/docs/marks/rule.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
