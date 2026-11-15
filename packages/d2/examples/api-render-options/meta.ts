// d2 example: Render one diagram with different options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render one diagram with different options",
  summary:
    "The diagram is compiled once; render then redraws it with another `themeID`, `sketch` or `pad` without a new layout. The full view has a control for each; the card steps through five combinations.",
  section: "D2.js API",
  tags: ["render", "themeID", "sketch", "pad"],
  docs: [
    "repo/d2js/js/README.md",
    "repo/d2js/js/index.d.ts",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
