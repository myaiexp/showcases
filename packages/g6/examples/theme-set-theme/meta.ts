// g6 example: Theme: setTheme between light and dark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: setTheme between light and dark",
  summary: "A select calls graph.setTheme with the built-in light or dark theme and redraws the same graph.",
  section: 'Theme',
  tags: ["setTheme", "getTheme", "theme"],
  docs: [
    "repo/packages/site/docs/api/theme.en.md",
    "repo/packages/site/docs/manual/theme/custom-theme.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
