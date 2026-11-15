// penrose example: match_id and match_total
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'match_id and match_total place each match',
  summary:
    'Inside a block, `match_total` is how many times it runs and `match_id` is the 1-indexed number of the current run. Together they space the dots evenly across the canvas, grow each radius with its rank and walk a hue around the colour wheel; 3, 5 and 8 dots all fill the row.',
  section: 'Style: Selectors',
  tags: ['match_id', 'match_total', 'reserved variables', 'hsva'],
  docs: ['repo/packages/docs-site/docs/ref/style/selectors.md', 'repo/packages/docs-site/blog/new-language-features.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
