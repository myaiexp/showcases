// observable-plot example: Tip: tip option or explicit tip mark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tip: tip option or explicit tip mark',
  summary:
    'A line of Apple stock with a tip on hover, written as the tip: true mark option or as an explicit Plot.tip over the pointerX transform.',
  section: 'Mark: Tip',
  tags: ['tip', 'pointerX', 'lineY'],
  docs: ['repo/docs/marks/tip.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
