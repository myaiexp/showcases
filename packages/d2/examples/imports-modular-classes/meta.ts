// d2 example: Classes kept in their own file
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Classes kept in their own file",
  summary:
    "classes.d2 holds only class definitions; main.d2 spreads it in and applies them with `class:` and class lists such as `[base; error]`. Changing one class name restyles the modal.",
  section: "Imports",
  tags: ["import", "classes", "style"],
  docs: [
    "repo/docs/tour/modular-classes.md",
    "repo/static/d2/classes.d2",
    "repo/static/d2/imports-classes-main.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
