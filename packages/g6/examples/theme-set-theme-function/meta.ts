// g6 example: Theme: setTheme with a callback and getTheme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: setTheme with a callback and getTheme",
  summary: "A button flips the theme with setTheme((prev) => next) and a line prints what getTheme returns.",
  section: 'Theme',
  tags: ["setTheme", "getTheme", "theme"],
  docs: [
    "repo/packages/site/docs/api/theme.en.md",
    "repo/packages/site/docs/manual/theme/custom-theme.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
