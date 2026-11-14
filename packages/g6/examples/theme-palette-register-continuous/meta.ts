// g6 example: Palette: register a continuous palette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: register a continuous palette",
  summary: "A function from 0 to 1 to a colour is registered as a palette and used by name with type value. A slider stretches the data range.",
  section: 'Theme',
  tags: ["ExtensionCategory.PALETTE", "register", "palette", "type value"],
  docs: [
    "repo/packages/site/docs/manual/theme/custom-palette.en.md",
    "repo/packages/site/docs/manual/theme/palette.en.md",
    "repo/packages/site/common/manual/core-concept/palette/continuous-palette.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
