// vchart example: Radar area, line and point marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radar area, line and point marks",
  summary:
    "A radar series draws area, line and point marks; area.visible and point.visible switch them, and seriesMark picks the mark the legend symbol follows. A select changes each; the preview steps through combinations.",
  section: "Pie, Rose and Radar",
  tags: ['radar', 'seriesMark', 'area', 'line', 'point'],
  docs: [
    'repo/docs/assets/option/en/series/radar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
