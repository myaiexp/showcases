// d2 example: ASCII output in two character sets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ASCII output in two character sets",
  summary:
    "`ascii: true` makes render return text art instead of SVG. `asciiMode: 'extended'` (the default) draws boxes with Unicode box-drawing characters; `'standard'` uses only + - | and > for plain ASCII.",
  section: "Exports",
  tags: ["ascii", "asciiMode"],
  docs: [
    "repo/docs/tour/exports.md",
    "repo/blog/ascii.md",
    "repo/d2js/js/index.d.ts",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
