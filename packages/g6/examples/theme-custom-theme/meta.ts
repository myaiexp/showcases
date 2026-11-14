// g6 example: Theme: register a custom theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: register a custom theme",
  summary: "A theme object with background, node, edge, combo and a selected state is registered under a showcase- name and set through the theme option.",
  section: 'Theme',
  tags: ["ExtensionCategory.THEME", "register", "theme", "node.state"],
  docs: [
    "repo/packages/site/docs/manual/theme/custom-theme.en.md",
    "repo/packages/site/docs/manual/theme/overview.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
