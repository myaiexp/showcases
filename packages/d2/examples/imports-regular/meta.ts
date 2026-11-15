// d2 example: Regular import
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Regular import",
  summary:
    "`a: @x.d2` sets the whole of x.d2 as the value of a, so a becomes a container holding the circle x. The `.d2` extension can be left off, and the same file can be imported into several shapes. D2.js gets the extra file through compile's `fs` map.",
  section: "Imports",
  tags: ["import", "@", "fs"],
  docs: [
    "repo/docs/tour/imports.md",
    "repo/d2js/js/README.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
