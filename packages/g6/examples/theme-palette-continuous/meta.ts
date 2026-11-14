// g6 example: Palette: continuous interpolator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: continuous interpolator",
  summary: "A palette of type value maps a numeric data field through an interpolator function to the node fill. Selects change the ramp and invert it.",
  section: 'Theme',
  tags: ["palette", "type value", "field", "color", "invert"],
  docs: [
    "repo/packages/site/docs/manual/theme/palette.en.md",
    "repo/packages/site/common/manual/core-concept/palette/continuous-palette.md",
    "repo/packages/site/docs/manual/theme/custom-palette.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
