// marked example: Wrap every page in a frame
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Wrap every page in a frame",
  summary:
    "A postprocess hook puts a pinned header on the finished page and a footer that counts words and list items, so every page is framed the same way without touching the Markdown.",
  section: "Hooks",
  tags: ["hooks", "postprocess"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
