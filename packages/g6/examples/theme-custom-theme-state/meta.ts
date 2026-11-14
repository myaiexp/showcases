// g6 example: Theme: state styles in a custom theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: state styles in a custom theme",
  summary: "A registered theme defines selected, active and inactive node states. A select applies each to one node.",
  section: 'Theme',
  tags: ["ExtensionCategory.THEME", "register", "state", "setElementState"],
  docs: [
    "repo/packages/site/docs/manual/theme/custom-theme.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
