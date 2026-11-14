// vchart example: Pie padAngle and cornerRadius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie padAngle and cornerRadius",
  summary:
    "padAngle opens a gap in degrees between neighbouring sectors, and cornerRadius rounds each sector's corners. Sliders in the full view set both on a donut; the preview steps through four combinations.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'padAngle', 'cornerRadius'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pie.md',
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
