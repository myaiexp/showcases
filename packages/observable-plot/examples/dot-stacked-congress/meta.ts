// observable-plot example: Dot: stacked dots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: stacked dots',
  summary:
    'The 2023 US Congress by age and gender as a diverging stack of dots. stackY2 places each dot at the upper end of its interval, so the first man sits at 1 and the first woman at -1.',
  section: 'Mark: Dot',
  tags: ['dot', 'stackY2', 'ruleY', 'tickFormat', 'aspectRatio'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
