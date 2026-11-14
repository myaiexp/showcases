// marked example: Tables with a row count
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Tables with a row count",
  summary:
    "A trip budget table in a scrolling box with a footer such as '5 rows · 3 columns', next to the plain table. It overrides renderer.table, calling this.tablerow and this.tablecell for the parts.",
  section: "Renderer",
  tags: ["renderer", "table", "tablerow", "tablecell"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
