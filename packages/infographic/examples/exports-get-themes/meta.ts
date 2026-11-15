// AntV Infographic example: Exports: getThemes() and the names it returns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getThemes() and the names it returns",
  summary:
    "getThemes() returns the names of the available themes; in 0.2.20 they are light, dark and hand-drawn (the docs call the first one default). The card renders one infographic with each name from the array as its theme, so the list and the three looks are one thing.",
  section: "Exports",
  tags: ["getThemes", "theme"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/built-in-themes.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
