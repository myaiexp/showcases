// g6 example: Palette: register a discrete palette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: register a discrete palette",
  summary: "Colour arrays registered with ExtensionCategory.PALETTE are used by name in a group palette that colours nodes by category.",
  section: 'Theme',
  tags: ["ExtensionCategory.PALETTE", "register", "palette", "type group"],
  docs: [
    "repo/packages/site/docs/manual/theme/custom-palette.en.md",
    "repo/packages/site/docs/manual/theme/palette.en.md",
    "repo/packages/site/common/manual/core-concept/palette/standard-config.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
