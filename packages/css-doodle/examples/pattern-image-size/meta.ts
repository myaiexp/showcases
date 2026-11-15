// Image sizes: @pattern, @pattern48 and @pattern64x36
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image sizes: @pattern, @pattern48 and @pattern64x36",
  summary: "Without digits the image takes the size of the element. @pattern48 draws a 48-pixel square image and @pattern64x36 a 64 by 36 one, which is stretched to the element and so shows coarser detail. The variants step through the three.",
  section: "Patterns",
  tags: ["@pattern", "@pattern<width>x<height>", "fbm"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
