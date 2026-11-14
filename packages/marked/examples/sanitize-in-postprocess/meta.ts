// marked example: Sanitize at the end with postprocess
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Sanitize at the end with postprocess",
  summary:
    "Marked's HTML next to the same HTML after a postprocess hook ran DOMPurify over it: broken-image tricks, script tags and javascript: links are gone, so no caller can forget to sanitize.",
  section: "Hooks",
  tags: ["hooks", "postprocess", "DOMPurify", "security"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
