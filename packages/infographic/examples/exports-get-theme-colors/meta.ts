// AntV Infographic example: Exports: getThemeColors() derives a colour set
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getThemeColors() derives a colour set",
  summary:
    "getThemeColors({ colorPrimary, colorBg }) derives the nine ThemeColors an item receives: primary, a tinted background, text colours, white, the canvas and an elevated card colour, plus whether the result is dark. The card feeds it three colour pairs, draws the derived chips and renders an infographic with the same two inputs.",
  section: "Exports",
  tags: ["getThemeColors", "ThemeColors", "colorPrimary", "colorBg"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
