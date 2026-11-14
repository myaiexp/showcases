// marked example: Tickable checkboxes
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Tickable checkboxes",
  summary:
    "A packing checklist where the boxes really click, a bar counts how many are done, and ticking a box rewrites the [ ] in the Markdown. It overrides renderer.checkbox, which is disabled by default.",
  section: "Renderer",
  tags: ["renderer", "checkbox", "task list", "GFM"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
