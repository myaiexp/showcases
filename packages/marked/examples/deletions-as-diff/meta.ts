// marked example: Deletions as edits
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Deletions as edits",
  summary:
    "A dinner plan where ~~6pm -> 7pm~~ shows as a red struck-out value followed by a green replacement, like a tracked change. It overrides renderer.del and splits the content at the arrow.",
  section: "Renderer",
  tags: ["renderer", "del", "strikethrough", "GFM"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
