// d2 example: Spread import
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spread import",
  summary:
    "`...@x` inside a map inserts the contents of x.d2 into that map, which here gives the same result as a regular import. At the root it adds x as a top-level shape. `a: ...@x` outside a map is an error, shown in the last variant.",
  section: "Imports",
  tags: ["import", "spread", "..."],
  docs: [
    "repo/docs/tour/imports.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
