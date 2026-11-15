// channels { r: b; b: r; } is a color matrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: swap red and blue",
  summary: "A channels block is an feColorMatrix. Each declaration sets an output channel, r, g, b or a, from input channels, and each reads the original input, so r: b; b: r swaps red and blue. Cells pick pink, yellow or black at random, and pink turns blue.",
  section: "SVG",
  tags: ["@svg-filter","channels","feColorMatrix","@p"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
