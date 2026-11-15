// d2 example: A C4 model with the C4 theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A C4 model with the C4 theme",
  summary:
    "The C4 post's banking system: c4-person shapes, Markdown labels with a heading and a [Container] line, and `theme-id: 303` (the C4 theme) set in the source's d2-config. The second variant passes `themeID: 200` to compile, which overrides the theme set in the source.",
  section: "C4",
  tags: ["c4-person", "theme 303", "markdown", "d2-config"],
  docs: [
    "repo/blog/c4.md",
    "repo/static/d2/c4.d2",
    "repo/docs/tour/themes.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
