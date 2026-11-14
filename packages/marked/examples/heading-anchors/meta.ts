// marked example: Heading anchors
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Heading anchors",
  summary:
    "Every heading gets its own id and a small # link, the way GitHub READMEs do, so one section can be linked directly. Built by overriding renderer.heading in new Marked().",
  section: "Renderer",
  tags: ["renderer", "heading", "this.parser.parseInline", "anchor"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
