// observable-plot example: Stack: custom Likert offset function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: custom Likert offset function',
  summary:
    'Survey answers as diverging bars, built with a custom order array and an offset function that centers the neutral responses on zero.',
  section: 'Transform: Stack',
  tags: ['barX', 'groupZ', 'stackX', 'offset', 'order'],
  docs: ['repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
