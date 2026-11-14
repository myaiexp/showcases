// vchart example: Waterfall: total at the end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waterfall: total at the end',
  summary:
    'total.type \'end\' appends one more bar that holds the final sum, labelled by total.text. stackLabel prints the absolute value after each step through valueType.',
  section: 'Bar',
  tags: ['total.type', 'total.text', 'stackLabel.valueType', 'stackLabel.formatMethod'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Waterfall.md',
    'repo/docs/assets/option/en/series/waterfall.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
