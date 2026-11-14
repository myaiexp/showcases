// vchart example: Area: totalLabel on stacked areas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: totalLabel on stacked areas',
  summary:
    'On a stacked area series totalLabel prints the sum at every x position above the top edge. The new data refreshes the totals along with the bands.',
  section: 'Line and Area',
  tags: ['totalLabel', 'stack', 'area'],
  docs: [
    'repo/docs/assets/option/en/series/area.md',
    'repo/docs/assets/option/en/component/total-label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
