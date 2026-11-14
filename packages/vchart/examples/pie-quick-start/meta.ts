// vchart example: Pie quick start: categoryField and valueField
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie quick start: categoryField and valueField",
  summary:
    "A pie chart from eight rows: categoryField names each sector, valueField sets its angle, and label draws the names outside. Every two seconds updateData supplies new values and the sectors swing to the new angles.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'categoryField', 'valueField', 'label', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pie.md',
    'repo/docs/assets/option/en/series/pie.md',
    'repo/docs/assets/option/en/chart/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
