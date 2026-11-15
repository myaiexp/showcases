// dither(x, y): a 4×4 Bayer threshold
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "dither(x, y): a 4×4 Bayer threshold",
  summary: "dither(x, y) is a 4 × 4 Bayer threshold from 0 to 1. Comparing a gradient with it turns shades of gray into black and white dots; here the gradient has a moving wave.",
  section: "Patterns",
  tags: ["@pattern", "dither", "match"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
