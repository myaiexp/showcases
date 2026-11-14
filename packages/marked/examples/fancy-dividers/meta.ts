// marked example: Fancy dividers
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Fancy dividers",
  summary:
    "A diary with --- lines between days, shown with the plain rule and with a decorated divider you can switch between stars, scissors and waves. It overrides renderer.hr.",
  section: "Renderer",
  tags: ["renderer", "hr", "divider"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
