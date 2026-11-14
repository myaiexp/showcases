// vchart example: Combination: a pie above a line chart in a grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Combination: a pie above a line chart in a grid",
  summary:
    "Two regions in a grid layout: layout.elements place the legend, the pie region (spanning both columns), the line region and its two axes by modelId, and one legend serves both regions through regionId.",
  section: "Combination",
  tags: ['common','layout','grid','region','elements','regionId','legends'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Combination.md',
    'repo/docs/assets/option/en/common/layout.md',
    'repo/docs/assets/option/en/chart/common.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
