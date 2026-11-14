// vchart example: Theme: a palette per series type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: a palette per series type",
  summary:
    "colorScheme takes a default palette and extra palettes keyed by series type. In a bar and line combination the bars use the bar palette and the lines the line palette; the selector adds the keys one by one.",
  section: "Theme",
  tags: ['colorScheme','common chart','IThemeColorScheme'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Color_Theme.md",
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
