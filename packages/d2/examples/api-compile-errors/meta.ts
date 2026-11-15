// d2 example: Compile errors with line and column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Compile errors with line and column",
  summary:
    "When the source is wrong, compile rejects with the compiler's whole error list, each error with its line and column. Four sources with typical mistakes show what comes back; in the full view, edit one to fix it.",
  section: "D2.js API",
  tags: ["compile", "errors"],
  docs: [
    "repo/d2js/js/README.md",
    "repo/docs/tour/connections.md",
    "repo/docs/tour/imports.md",
    "repo/docs/tour/shapes.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
