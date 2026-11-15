// AntV Infographic example: Exports: getFonts() as a specimen sheet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getFonts() as a specimen sheet",
  summary:
    "getFonts() lists every registered font as a Font object: a display name, a CSS fontFamily, a baseUrl and a map of weights. The sheet draws one row per entry in its own family (this gallery backs the five built-in names with bundled stand-in fonts) and the card swaps the sample sentence.",
  section: "Exports",
  tags: ["getFonts", "Font", "fontFamily", "fontWeight"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
