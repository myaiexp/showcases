// observable-plot example: Tip: pooling pointer tips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tip: pooling pointer tips',
  summary:
    'Two tip marks share a pointerX: with pool true only one tip shows at a time, with pool false both do.',
  section: 'Mark: Tip',
  tags: ['tip', 'pointerX', 'pool'],
  docs: ['repo/docs/marks/tip.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
