// vchart example: Title wrapping: maxWidth, wordBreak and lineClamp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Title wrapping: maxWidth, wordBreak and lineClamp",
  summary: "A long chart title is boxed by title.maxWidth and the text style's wordBreak, then cut to lineClamp lines. Sliders change the width and the line limit.",
  section: "Option: Components",
  tags: ["title.maxWidth","textStyle.wordBreak","textStyle.lineClamp","subtextStyle"],
  docs: [
    'repo/docs/assets/option/en/component/title.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
