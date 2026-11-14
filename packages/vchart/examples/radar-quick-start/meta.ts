// vchart example: Radar quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radar quick start",
  summary:
    "A radar chart places each category on the angle axis and its value on the radius axis, joined into a closed shape; area.visible fills it. Fixed radius axis limits keep the animated values comparable.",
  section: "Pie, Rose and Radar",
  tags: ['radar', 'categoryField', 'valueField', 'area', 'axes'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Radar.md',
    'repo/docs/assets/option/en/series/radar.md',
    'repo/docs/assets/option/en/chart/radar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
