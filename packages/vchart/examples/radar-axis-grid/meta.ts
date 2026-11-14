// vchart example: Radar axis grid and domain line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radar axis grid and domain line",
  summary:
    "The radius axis grid can be polygons or smooth rings (grid.smooth) with alternating background bands (alternateColor), and the angle axis can draw a domainLine at the rim. Selects set each.",
  section: "Pie, Rose and Radar",
  tags: ['radar', 'axes', 'grid.smooth', 'alternateColor', 'domainLine'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Radar.md',
    'repo/docs/assets/option/en/series/radar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
