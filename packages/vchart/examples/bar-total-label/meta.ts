// vchart example: Bar: totalLabel on stacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: totalLabel on stacks',
  summary:
    'totalLabel shows the sum of each stack above (or below) the column when the data is stacked. A select switches position between top and bottom, and formatMethod adds a unit.',
  section: 'Bar',
  tags: ['totalLabel', 'totalLabel.position', 'totalLabel.formatMethod', 'stack'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/series/bar.md',
    'repo/docs/assets/option/en/component/total-label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
