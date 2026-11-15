// Sizes: @shaders, @shaders64x36 and @shaders24x14
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sizes: @shaders, @shaders64x36 and @shaders24x14",
  summary: "Digits after the name set the image size in CSS pixels: @shaders800 is square, @shaders64x36 is 64 by 36. A smaller image is stretched over the element, so it looks coarse. The variants step from the element's own size to a tiny one.",
  section: "Shaders",
  tags: ["@shaders", "@shaders<width>x<height>", "u_resolution"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
