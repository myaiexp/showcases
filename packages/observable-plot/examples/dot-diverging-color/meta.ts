// observable-plot example: Dot: diverging colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: diverging colour',
  summary:
    'Surface temperature anomalies as dots whose stroke follows a diverging BuRd scale, blue below zero and red above, with a ruleY at zero.',
  section: 'Mark: Dot',
  tags: ['dot', 'stroke', 'scheme', 'ruleY', 'tickFormat'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
