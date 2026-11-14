// marked example: Async preprocess: include a file
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Async preprocess: include a file",
  summary:
    "A note ending in @include signature gets the signature fetched and pasted in before Marked reads it. With async: true a preprocess hook may return a Promise, and parse() waits for it.",
  section: "Async",
  tags: ["async", "hooks", "preprocess", "Promise"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts", "repo/src/Instance.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
