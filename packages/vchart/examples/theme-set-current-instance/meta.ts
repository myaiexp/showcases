// vchart example: Theme: switch themes on one instance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: switch themes on one instance",
  summary:
    "vchart.setCurrentTheme restyles a single chart with a registered theme by name. The global ThemeManager.setCurrentTheme is deliberately not used, because it would change every chart on the page.",
  section: "Theme",
  tags: ['setCurrentTheme','ThemeManager.registerTheme'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Apply_Theme.md",
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Customize_Theme.md",
    "repo/docs/assets/api/en/API/theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
