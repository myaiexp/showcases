// vchart example: Theme: inline theme in the spec
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: inline theme in the spec",
  summary:
    "The spec's theme key takes a theme object directly, so one chart gets its own palette and bar style without registering anything. Switching the palette is an updateSpec with a new theme object.",
  section: "Theme",
  tags: ['spec.theme','colorScheme','updateSpec'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Customize_Theme.md",
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Apply_Theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
