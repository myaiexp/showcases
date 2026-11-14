// vchart example: Pie minAngle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie minAngle",
  summary:
    "With values from 620 down to 1 the smallest sectors would vanish. minAngle sets a floor in degrees so every sector stays visible and can be hovered; a slider moves it from 0 to 40.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'minAngle'],
  docs: [
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
