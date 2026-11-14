// marked example: Renderer priority
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Renderer priority",
  summary:
    "The same outline rendered by three stacked setups: the later heading override wins for the top heading, falls through to the earlier one when it returns false, and erases the headings when it returns nothing.",
  section: "Renderer",
  tags: ["renderer", "priority", "false", "new Marked", "use"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
