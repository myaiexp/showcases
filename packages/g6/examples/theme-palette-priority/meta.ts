// g6 example: Palette: style fill overrides the palette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: style fill overrides the palette",
  summary: "With style.fill set every node is red. Removing it lets the spectral palette colour the nodes.",
  section: 'Theme',
  tags: ["palette", "style.fill", "spectral"],
  docs: [
    "repo/packages/site/docs/manual/theme/palette.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
