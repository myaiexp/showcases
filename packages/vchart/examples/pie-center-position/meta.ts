// vchart example: Pie centerX and centerY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie centerX and centerY",
  summary:
    "centerX and centerY accept percentage strings, calculated against the layout width and height, so a pie can sit anywhere in its chart area. Sliders move it; the preview jumps between four spots.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'centerX', 'centerY'],
  docs: [
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
