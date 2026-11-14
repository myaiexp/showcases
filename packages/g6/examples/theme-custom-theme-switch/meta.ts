// g6 example: Theme: switch between registered themes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: switch between registered themes",
  summary: "Three themes are registered with different backgrounds and colours. A select swaps them on the same graph with setTheme.",
  section: 'Theme',
  tags: ["ExtensionCategory.THEME", "register", "setTheme", "theme"],
  docs: [
    "repo/packages/site/docs/manual/theme/custom-theme.en.md",
    "repo/packages/site/docs/api/theme.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
