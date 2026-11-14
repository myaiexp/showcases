// g6 example: Theme: a state prop without a default is not cleared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: a state prop without a default is not cleared",
  summary: "Two copies of one theme, one with stroke and lineWidth defaults and one without. After selecting and unselecting node b, only the first returns to its default.",
  section: 'Theme',
  tags: ["ExtensionCategory.THEME", "register", "state", "setTheme"],
  docs: [
    "repo/packages/site/docs/manual/theme/custom-theme.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
