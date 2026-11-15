// d2 example: Relative import paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Relative import paths",
  summary:
    "An import path is resolved from the file that contains it: d2-stuff/x.d2 imports `@../y`, which finds y.d2 beside the entry file. `@./y` and `@y` name the same file.",
  section: "Imports",
  tags: ["import", "relative", "fs"],
  docs: [
    "repo/docs/tour/imports.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
