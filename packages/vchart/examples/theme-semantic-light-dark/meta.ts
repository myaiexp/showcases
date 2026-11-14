// vchart example: Theme: tokens for light and dark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: tokens for light and dark",
  summary:
    "The theme's axis and legend styles are written in palette tokens, and two registered themes define the same token names with light and dark values. vchart.setCurrentTheme flips one chart between them.",
  section: "Theme",
  tags: ['palette','setCurrentTheme','registerTheme','background'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Color_Theme.md",
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Theme_Concept_and_Design_Rules.md",
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Apply_Theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
