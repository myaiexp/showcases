// vchart example: Combination: stacked regions with rowHeight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Combination: stacked regions with rowHeight",
  summary:
    "A price line over a volume bar chart, each in its own region with its own value axis, placed by a grid layout. layout.rowHeight with a function size gives the top region a share of the height; a slider (and the card, on a timer) changes it.",
  section: "Combination",
  tags: ['common','region','layout','rowHeight','colWidth','axes','regionId'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Combination.md',
    'repo/docs/assets/option/en/common/layout.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
