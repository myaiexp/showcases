// vchart example: Theme: semantic palette tokens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: semantic palette tokens",
  summary:
    "colorScheme.default with dataScheme and palette defines colour tokens; the theme's axis line, ticks, grid, labels and title refer to them as { type: 'palette', key }. Swapping the palette recolours every use at once.",
  section: "Theme",
  tags: ['IColorSchemeStruct','palette','IColorKey','dataScheme'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Color_Theme.md",
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Theme_Concept_and_Design_Rules.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
